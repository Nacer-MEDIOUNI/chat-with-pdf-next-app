// lib/db/queries.ts
import { eq } from 'drizzle-orm';
import { messages } from './schema';
import { db } from "@/lib/db";


export async function getMessagesByChatId(chatId: number) {
  return await db.select().from(messages).where(eq(messages.chatId, chatId));
}