"use client";

import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import VerticalImagesCarousel from "./VerticalImagesCarousel";
import { leftSideImages, rightSideImages } from "@/lib/utils";

type HomeProps = {
  userId: string | null;
  lastChatId: number | null;
};

export default function Home({ userId, lastChatId }: HomeProps) {
  const isAuth = !!userId;

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-6 lg:left-20 w-[6rem] lg:w-[10rem]  h-screen">
        <VerticalImagesCarousel images={leftSideImages} />
      </div>
      <div className=" w-screen min-h-screen bg-gradient-to-t from-gray-700 via-gray-900 to-black text-white  ">
        <div className="absolute w-full p-8 lg:w-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col items-center text-center gap-4 ">
            <div className="relative  ">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-full">
                <h1 className="mr-3 text-2xl lg:text-5xl font-semibold">
                  Chat with your PDFs
                </h1>
                <p className="text-sm lg:text-lg">
                  Upload your PDF and start chatting with it
                </p>
                {/* <div className="absolute -z-[10] h-20 w-full top-[150%] rounded-full shadow-2xl rotate-180 shadow-white  bg-white "></div> */}
              </div>
              <div className=" flex flex-col items-center lg:mt-2 ">
                <div className="w-full mt-4">
                  {!isAuth ? (
                    <Link href="/sign-in">
                      <Button className="mb-4 bg-white text-gray-800 hover:bg-gray-900 hover:text-white">
                        Login to get Started!
                        <LogIn className="w-4 h-4 my-4" />
                      </Button>
                    </Link>
                  ) : (
                    <div className="">
                      <FileUpload />
                      <Link href={`/chat/${lastChatId}`}>
                        <Button className="my-4 bg-transparent  underline hover:no-underline hover:bg-transparent">
                          Skip to my Chats!
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                <p className="max-w-xl mt-1 text-xs lg:text-sm">
                  Join millions of students, researchers and professionals to
                  instantly answer questions and understand research with AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-6 lg:right-20 w-[6rem] lg:w-[10rem] h-screen">
        <VerticalImagesCarousel images={rightSideImages} />
      </div>
    </div>
  );
}
