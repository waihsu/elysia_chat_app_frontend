import ChatLayout from "@/components/chat-layout";
import React from "react";

export default function Empty() {
  return (
    <ChatLayout>
      <div className="px-4 py-1- sm:px-6 lg:px-8 h-full flex justify-center items-center bg-background">
        Empty
      </div>
    </ChatLayout>
  );
}
