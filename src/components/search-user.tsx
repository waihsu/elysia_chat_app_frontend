import React, { useEffect, useState } from "react";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { User } from "@/types/types";
import UserList from "./user-list";
import useAuthStore from "@/store/auth";

export default function SearchUser() {
  const { user } = useAuthStore();

  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  async function getUsers() {
    const resp = await fetch(
      `http://localhost:3000/api/user/search/${String(
        user?.id
      )}?name=${searchName}`
    );

    if (!resp.ok) {
      toast({ title: "Refresh and try again", variant: "destructive" });
    } else {
      const { users } = await resp.json();
      // console.log(users);
      setUsers(users);
    }
  }

  useEffect(() => {
    getUsers();
  }, [searchName, user]);

  console.log(users);

  return (
    <div className="bg-gray-100 h-full">
      <div className="pt-4 px-2">
        <div className=" relative">
          <Search className="absolute top-2 left-2 " />
          <Input
            type="text"
            className=" pl-9 "
            placeholder="Search"
            onChange={(evt) => setSearchName(evt.target.value)}
          />
        </div>
      </div>

      <div className=" h-[90%] mt-4 px-2 overflow-y-scroll">
        <UserList users={users} />
      </div>
    </div>
  );
}
