import React from "react";
import Sidebar from "./sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <div className="w-96 hidden lg:block fixed h-svh">
        <Sidebar />
      </div>
      <div className="pl-0 lg:block lg:pl-96 w-full h-svh ">{children}</div>
    </div>
  );
}
