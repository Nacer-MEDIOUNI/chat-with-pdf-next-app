// src/app/page.tsx (or HomeWrapper.tsx)
import Home from "@/components/Home";
import { auth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = auth(); // Runs on the server
  return <Home userId={userId} />;
}
