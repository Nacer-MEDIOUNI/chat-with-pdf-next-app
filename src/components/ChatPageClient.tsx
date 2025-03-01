"use client";

import { useState } from "react";
import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { Button } from "./ui/button";
import { HomeIcon, PlusCircle, SidebarClose, SidebarOpen } from "lucide-react";

type ChatPageClientProps = {
  chatId: string;
  chatsList: any[];
  currentChat: any;
};

const ChatPageClient = ({
  chatId,
  chatsList,
  currentChat,
}: ChatPageClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNewChatClick = () => {
    setIsModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden ">
        <div className="flex flex-col lg:flex-row  w-full h-screen overflow-hidden">
          {/* chat sidebar */}

          <div
            className={` ${
              isSidebarOpen
                ? " flex-[1] border-r-2 border-slate-200 max-w-xs "
                : "flex  lg:h-screen justify-center items-center  "
            }  `}
          >
            <>
              <div
                className={`relative z-50 -top-1  flex ${
                  isSidebarOpen
                    ? "h-fit w-full"
                    : " h-fit items-center justify-center ml-2 "
                }  `}
              >
                <div
                  className={`  flex  ${
                    isSidebarOpen
                      ? " bg-white h-fit p-4  w-full items-center justify-around"
                      : " bg-white h-fit items-center rounded-3xl lg:flex-col gap-2 p-4 border-[1px] "
                  }  `}
                >
                  <Button
                    className=" w-10 h-10 bg-transparent text-black hover:text-white hover:bg-gray-800 rounded-full border-white border"
                    onClick={navigateToHome}
                  >
                    <HomeIcon className="w-10 h-10" />
                  </Button>
                  <Button
                    className=" w-fit rounded-lg bg-gray-800  border-white border"
                    onClick={handleNewChatClick}
                  >
                    {isSidebarOpen ? "Start New Chat" : ""}

                    <PlusCircle className="w-10 h-10" />
                  </Button>
                  <Button
                    onClick={toggleSidebar}
                    className="w-10 h-10 border bg-transparent text-black hover:text-white hover:bg-gray-800 rounded-full border-white"
                  >
                    {isSidebarOpen ? (
                      <SidebarClose className="w-5 h-5" />
                    ) : (
                      <SidebarOpen className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </>
            {isSidebarOpen && (
              <ChatSideBar
                chats={chatsList}
                chatId={parseInt(chatId)}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </div>
          {/* pdf viewer */}
          <div className="h-screen p-4 overflow-hidden flex-[5]">
            <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
          </div>
          {/* chat component */}
          <div className="flex-[3] border-l-2 border-l-slate-200">
            <ChatComponent chatId={parseInt(chatId)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPageClient;
