import { User } from "@/types/types";
import React from "react";
import UserItem from "./user-item";

export default function UserList({ users }: { users: User[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-3">
        {users.map((user) => (
          <UserItem
            key={user.id}
            email={user.email}
            id={user.id}
            name={user.name}
          />
        ))}
      </div>
    </div>
  );
}
