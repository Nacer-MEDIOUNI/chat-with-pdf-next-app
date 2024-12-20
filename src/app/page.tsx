import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <Button>Hi there!</Button>
        </div>
      </div>
    </div>
  );
}
