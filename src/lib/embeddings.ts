import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    // Call the OpenAI API to get the embeddings
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "), // Replace newlines with spaces
    });

    // Convert response to JSON
    const result = await response.json();
    
    // Log the raw response for debugging purposes
    console.log("Raw response from OpenAI:", result);

    // Check if result.data is an array and has at least one element
    if (!result.data || !Array.isArray(result.data) || result.data.length === 0) {
      throw new Error('No embeddings returned or unexpected API response structure');
    }

    // Return the embedding data from the first item
    return result.data[0].embedding as number[];
  } catch (error) {
    console.error("Error calling OpenAI embeddings API:", error);
    throw error; // Re-throw the error after logging it
  }
}
