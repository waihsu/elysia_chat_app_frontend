import { User } from "@/types/types";
import React from "react";
import { Link } from "react-router-dom";
import { ConnectionState } from "./ConnectionState";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import DeleteDialog from "./delete-dialog";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { ConversationsStore } from "@/store/conversations";

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
  const { removeConversation } = ConversationsStore();
  async function onDelete() {
    const resp = await fetch(`/api/conversation/${id}`, { method: "DELETE" });

    if (!resp.ok) {
      const { messg } = await resp.json();
      toast({ title: messg, variant: "destructive" });
    } else {
      const { messg, id } = await resp.json();
      toast({ title: messg });
      removeConversation(id);
    }
  }
  return (
    <div className="relative bg-blue-300">
      <Link to={`/conversations/${id}`}>
        <div className="border border-border bg-background py-2 px-4 shadow-md rounded-md">
          <div className="flex items-center gap-x-2">
            {name
              ? name
              : users.map((item) => (
                  <div key={item.id} className="flex items-center py-4">
                    <span className="text-xl">{item.name}</span>
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
      <div className="absolute z-50 top-5 right-8 ">
        <DeleteDialog
          callback={onDelete}
          children={
            <Button size={"icon"} variant={"outline"}>
              <DotsHorizontalIcon />
            </Button>
          }
        />
      </div>
    </div>
  );
}
