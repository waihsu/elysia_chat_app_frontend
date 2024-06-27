import { FriendLists } from "@/store/friends";
import React from "react";
import UserList from "./user-list";

export default function Friends() {
  const { friends } = FriendLists();
  console.log(friends);
  return (
    <div className="bg-gray-100 h-full px-2 pt-4">
      <UserList users={friends} />
    </div>
  );
}
