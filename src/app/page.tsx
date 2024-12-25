import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/FileUpload";
import { auth, UserButton } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
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
          </div>
          <div className="flex flex-col items-center mt-2">
            {isAuth && (
              <Button className="rounded-xl border-white border-2">
                Go to Chats <ArrowRight className="ml-2 " />
              </Button>
            )}
          </div>
          <p className="max-w-xl mt-1 text-lg text-white">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>{" "}
          <div className="w-full mt-4">
            {isAuth ? (
              <>
                <FileUpload />
              </>
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
