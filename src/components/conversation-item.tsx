import { User } from "@/types/types";
import React from "react";
import { Link } from "react-router-dom";
import { ConnectionState } from "./ConnectionState";

interface ConversationItemProps {
  id: string;
  name: string;
  users: User[];
  onlineUsers: string[];
}

export default function ConversationItem({
  id,
  name,
  users,
  onlineUsers,
}: ConversationItemProps) {
  return (
    <Link to={`/conversations/${id}`}>
      <div className="border border-border bg-background py-2 px-4 shadow-md rounded-md">
        <div className="flex items-center gap-x-2">
          {name
            ? name
            : users.map((item) => (
                <div key={item.id} className="flex items-center">
                  <span>{item.name}</span>
                  <ConnectionState
                    isConnected={
                      !!onlineUsers.filter((id) => id === item.id).length
                    }
                  />
                </div>
              ))}
        </div>
      </div>
    </Link>
  );
}
