import { OpenAI } from "openai";
import { Message } from "ai";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Initialize OpenAI client with custom configuration
const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1', dangerouslyAllowBrowser: true, // Allow browser usage (if needed)
});

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    console.log("Received messages:", JSON.stringify(messages, null, 2)); // Debugging line

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }

    const fileKey = _chats[0].fileKey;
    const pdfTextContent = _chats[0].pdfText;
    const lastMessage = messages[messages.length - 1];
    console.log("PDF Text Content:", pdfTextContent); // Debugging line

    const prompt = {
      role: "system",
      content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START PDF FILE CONTEXT
      ${pdfTextContent}
      END OF PDF FILE CONTEXT
      AI assistant will take into account any PDF FILE CONTEXT that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      `,
    };

    // Save user message into the database
    await db.insert(_messages).values({
      chatId,
      content: lastMessage.content,
      role: "user",
    });

    // Validate messages to ensure roles alternate correctly
    const validMessages = [];
    let lastRole = null;

    for (const message of messages) {
      if (message.role === "system") {
        // System message is allowed only as the first message
        if (validMessages.length === 0) {
          validMessages.push(message);
        }
      } else if (message.role === "user" || message.role === "assistant") {
        // Ensure roles alternate
        if (lastRole !== message.role) {
          validMessages.push(message);
          lastRole = message.role;
        }
      }
    }

    console.log("Validated messages:", JSON.stringify(validMessages, null, 2)); // Debugging line

    // Use the OpenAI client to create a chat completion with streaming
    const response = await client.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct-v0.1",
      max_tokens: 1024,
      messages: [
        prompt, // System message
        ...validMessages, // Validated user/assistant messages
      ],
      stream: true,
    });

    // Create a ReadableStream for streaming the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullContent = "";

        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          console.log("Chunk content:", content); // Debugging line
          fullContent += content;
          controller.enqueue(encoder.encode(content));
        }

        // Save the final completion into the database
        await db.insert(_messages).values({
          chatId,
          content: fullContent,
          role: "system",
        });

        controller.close();
      },
    });

    // Return the streaming response
    return new Response(stream, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
