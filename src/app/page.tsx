// src/app/page.tsx (or HomeWrapper.tsx)
import Home from "@/components/Home";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  const lastChatId = _chats.length > 0 ? _chats[_chats.length - 1].id : null;
  console.log(lastChatId);
  return <Home userId={userId} lastChatId={lastChatId} />;
}
