"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUploadModal from "./FileUploadModal";

// Define Props type
type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const ChatSideBar = ({ chats, chatId, isModalOpen, setIsModalOpen }: Props) => {
  return (
    <>
      <>
        <>
          <div className={cn(" flex flex-col h-screen ")}>
            <div className=" w-full overflow-x-hidden overflow-auto px-4">
              {/* Modal */}
              <FileUploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />

              {/* Chat List */}
              <div className="flex h-screen overflow-hidden pb-20 flex-col gap-2 ">
                {chats.map((chat) => (
                  <Link key={chat.id} href={`/chat/${chat.id}`}>
                    <div
                      className={cn(
                        "rounded-lg p-3 flex items-center",
                        chat.id === chatId
                          ? "bg-gray-800 text-white"
                          : "hover:bg-gray-200"
                      )}
                    >
                      <MessageCircle className="mr-2" />
                      <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                        {chat.pdfName}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
};

export default ChatSideBar;
