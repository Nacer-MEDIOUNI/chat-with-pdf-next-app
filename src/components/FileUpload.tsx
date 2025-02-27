"use client";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { uploadToS3 } from "@/lib/s3";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const FileUpload: React.FC = () => {
  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
      pdfText,
    }: {
      file_key: string;
      file_name: string;
      pdfText: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
        pdfText,
      });
      return response.data;
    },
  });

  const processPdfFile = async (pdfFile: File): Promise<string> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const pdfDoc = await pdfjs.getDocument(new Uint8Array(arrayBuffer)).promise;
    const numPages = pdfDoc.numPages;
    let fullText = "";

    for (let i = 1; i <= Math.min(numPages, 4); i++) {
      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      console.log(textContent, "textContent");
      const pageText = textContent.items
        .map((item: any) => item.str + (item.hasEOL ? "\n" : ""))
        .join("");
      fullText += `PAGE ${i}:\n\n${pageText}\n------\n\n`;
    }

    return fullText;
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      // Upload to S3
      const s3Data = await uploadToS3(file);
      if (!s3Data?.file_key || !s3Data.file_name) {
        throw new Error("S3 upload failed");
      }

      // Process PDF
      const pdfText = await processPdfFile(file);

      // Create chat
      mutate(
        {
          file_key: s3Data.file_key,
          file_name: s3Data.file_name,
          pdfText,
        },
        {
          onSuccess: ({ chat_id }) => {
            toast.success("Chat created!");
            router.push(`/chat/${chat_id}`);
          },
          onError: (error) => {
            console.error("Error creating chat:", error);
            toast.error("Failed to create chat");
          },
        }
      );
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Failed to process file");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large");
        return;
      }
      await handleFileUpload(file);
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl  ">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl  cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <Loader2 className="h-10 w-10 text-gray-800 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">Processing PDF...</p>
          </>
        ) : (
          <>
            {/* <Inbox className="w-10 h-10 text-gray-800" /> */}
            <DotLottieReact
              src="https://lottie.host/eec838e9-bd6a-41d2-ae7a-1427c0e27aa3/JPKNshO0rn.lottie"
              loop
              autoplay
              className="w-48"
            />
            <p className="mt-2 text-sm text-slate-400">
              Drop your PDF File here
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
