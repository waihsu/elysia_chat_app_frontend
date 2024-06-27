import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center bg-blue-300">
      <div className="w-full flex items-center justify-between">
        <div>Title</div>
        <div>
          <Link to={"/conversations"}>
            <Button variant={"ghost"}>Chat</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
