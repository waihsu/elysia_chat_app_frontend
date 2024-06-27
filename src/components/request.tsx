import { RequestFriends } from "@/store/requestFriends";
import React from "react";
import UserList from "./user-list";

export default function Request() {
  const { requestFriends } = RequestFriends();
  console.log(requestFriends);
  return (
    <div className="bg-gray-100 h-full px-2 pt-4">
      <UserList users={requestFriends} />
    </div>
  );
}
