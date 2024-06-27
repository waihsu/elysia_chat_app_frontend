import React from "react";
import DesktopSidebar, { routes } from "./desktop-sidebar";

export default function Sidebar() {
  const pathname = location.pathname;
  // console.log(pathname);
  return (
    <div className="w-full h-full flex ">
      <div className="">
        <DesktopSidebar />
      </div>
      <main className="w-full h-full ">
        {routes.find((item) => pathname.startsWith(item.href))?.comp}
      </main>
    </div>
  );
}
