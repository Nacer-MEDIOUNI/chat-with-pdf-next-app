import { S3 } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { Readable } from "stream";

const s3 = new S3({
  region: "eu-central-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file_key } = body;

    if (!file_key) {
      return NextResponse.json(
        { error: "file_key is required" },
        { status: 400 }
      );
    }

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
    };

    const obj = await s3.getObject(params);

    if (obj.Body instanceof Readable) {
      // Convert the Readable stream to a Buffer
      const chunks: Uint8Array[] = [];
      for await (const chunk of obj.Body) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      // Return the file content as a base64-encoded string
      const fileContent = fileBuffer.toString("base64");

      return NextResponse.json(
        { file_name: file_key, file_content: fileContent },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Invalid response from S3" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to download file from S3" },
      { status: 500 }
    );
  }
}