import ModelClient from "@azure-rest/ai-inference";
import { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.GITHUB_TOKEN; // Use your GitHub PAT or Azure key
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "text-embedding-3-large"; // Replace with your deployment name

export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const client = new ModelClient(endpoint, new AzureKeyCredential(token));

    const response = await client.path("/embeddings").post({
      body: {
        input: [text.replace(/\n/g, " ")], // Replace newlines with spaces
        model: modelName,
      },
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    // Return the embedding data from the first item
    return response.body.data[0].embedding as number[];
  } catch (error) {
    console.error("Error calling Azure AI Inference API:", error);
    throw error;
  }
}