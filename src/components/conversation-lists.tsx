import { ConversationsStore } from "@/store/conversations";
import React from "react";
import ConversationItem from "./conversation-item";
import { useActive } from "@/store/onlineUserStore";

export default function ConversationList() {
  const { conversations } = ConversationsStore();
  const { members } = useActive();
  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            id={conversation.id}
            name={conversation.name!}
            users={conversation.user_conversatin.map((item) => item.users)}
            onlineUsers={members}
          />
        ))}
      </div>
    </div>
  );
}
