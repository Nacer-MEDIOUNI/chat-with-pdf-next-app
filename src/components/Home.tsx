"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type HomeProps = {
  userId: string | null;
};

export default function Home({ userId }: HomeProps) {
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-black text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center gap-4 ">
          <div className="flex flex-col items-center">
            <UserButton afterSignOutUrl="/" />
            <h1 className="mr-3 text-5xl font-semibold">Chat with your PDFs</h1>
            <p className="text-lg">
              Upload your PDF and start chatting with it
            </p>
            <div className="w-full mt-4">
              {!isAuth ? (
                <Link href="/sign-in">
                  <Button>
                    Login to get Started!
                    <LogIn className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <FileUpload />
              )}
            </div>
          </div>

          <p className="max-w-xl mt-1 text-lg text-white">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>
        </div>
      </div>
    </div>
  );
}
