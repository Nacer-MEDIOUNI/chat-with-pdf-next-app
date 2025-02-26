import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import ChatPageClient from "@/components/ChatPageClient";

type Props = {
  params: {
    chatId: string;
  };
};

export default async function Page({ params: { chatId } }: Props) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  return (
    <ChatPageClient
      chatId={chatId}
      userId={userId}
      chatsList={_chats}
      currentChat={currentChat}
    />
  );
}
