import { db } from "@/lib/db";
import { chats, messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { S3 } from "@aws-sdk/client-s3";

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const chatId = parseInt(params.chatId);

    // Fetch the chat to get the file_key (S3 object key)
    const chat = await db
      .select()
      .from(chats)
      .where(eq(chats.id, chatId))
      .limit(1);

    if (!chat[0]) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const file_key = chat[0].fileKey;

    // Log the file_key for debugging
    console.log("Deleting S3 object with key:", file_key);

    // Delete messages associated with the chat
    await db.delete(messages).where(eq(messages.chatId, chatId));

    // Delete the chat itself
    await db.delete(chats).where(eq(chats.id, chatId));

    // Delete the file from S3
    const s3 = new S3({
      region: "eu-central-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const deleteResponse = await s3.deleteObject({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    });

    // Log the S3 delete response for debugging
    console.log("S3 delete response:", deleteResponse);

    return NextResponse.json(
      { message: "Chat, messages, and file deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}