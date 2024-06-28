import ChatLayout from "@/components/chat-layout";
import { routes } from "@/components/desktop-sidebar";

import MobileNavbar from "@/components/mobile-navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Empty() {
  const pathname = location.pathname;
  const navigate = useNavigate();
  return (
    <ChatLayout>
      <div className="hidden px-4 py-1- sm:px-6 lg:px-8 h-full lg:flex justify-center items-center bg-background">
        Empty
      </div>
      <main className="w-full h-svh lg:hidden flex flex-col justify-between ">
        <div className="h-full overflow-scroll">
          {routes.find((item) => pathname.startsWith(item.href))?.comp}
        </div>
        <div className="">
          <nav className="w-svw  py-2 flex justify-around">
            {routes.map((item, index) => (
              <MobileNavbar
                key={index}
                href={item.href}
                name={item.name}
                icon={item.icon}
              />
            ))}
            <Button
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "outline",
                }),
                "w-14 h-14"
              )}
              size={"icon"}
              variant={"ghost"}
              onClick={() => navigate("/")}
            >
              <LogOut />
            </Button>
          </nav>
        </div>
      </main>
    </ChatLayout>
  );
}
