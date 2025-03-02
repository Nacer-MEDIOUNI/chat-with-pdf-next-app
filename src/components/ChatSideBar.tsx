"use client";

import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { MessageCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUploadModal from "./FileUploadModal";
import ConfirmationModal from "./ConfirmationModal";

// Define Props type
type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const ChatSideBar = ({ chats, chatId, isModalOpen, setIsModalOpen }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<number | null>(null);

  // Function to handle delete
  const handleDeleteChat = async (chatId: number) => {
    try {
      const response = await fetch(`/api/chat/${chatId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      // Refresh the page or update the chat list
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (chatId: number) => {
    setChatToDelete(chatId);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setChatToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (chatToDelete) {
      handleDeleteChat(chatToDelete);
      closeDeleteModal();
    }
  };

  return (
    <>
      <div className={cn("flex flex-col h-screen")}>
        <div className="w-full overflow-x-hidden overflow-auto px-4">
          {/* File Upload Modal */}
          <FileUploadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
            title="Delete Chat?"
            message="Are you sure you want to delete this chat?"
          />

          {/* Chat List */}
          <div className="flex h-screen overflow-hidden pb-20 flex-col gap-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={cn(
                  "relative rounded-lg p-3 flex items-center justify-between",
                  chat.id === chatId
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-200"
                )}
              >
                <Link
                  href={`/chat/${chat.id}`}
                  className="flex items-center flex-1"
                >
                  <MessageCircle className="mr-2" />
                  <p
                    className={` overflow-hidden text-sm whitespace-nowrap text-ellipsis ${
                      chat.id === chatId ? "w-[80%]" : "w-[64%]"
                    }  `}
                  >
                    {chat.pdfName}
                  </p>
                </Link>
                <button
                  onClick={() => openDeleteModal(chat.id)}
                  className={`absolute ${
                    chat.id === chatId
                      ? "bg-gradient-to-r from-gray-800/90 to-gray-800 text-white hover:text-red-600 right-0"
                      : "hidden"
                  }   py-2 px-4 right-0 `}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
