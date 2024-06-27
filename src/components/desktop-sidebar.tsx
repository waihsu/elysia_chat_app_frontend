import Conversations from "./conversations";
import Friends from "./friends";
import Request from "./request";
import {
  LogOut,
  MessageCircleMore,
  UserPlus,
  UserSearch,
  Users,
} from "lucide-react";
import DesktopSidebarItem from "./desktop-sidebar-item";
import SearchUser from "./search-user";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export const routes = [
  {
    name: "Conversations",
    href: "/conversations",
    icon: MessageCircleMore,
    comp: <Conversations />,
  },
  {
    name: "Search",
    href: "/search",
    icon: UserSearch,
    comp: <SearchUser />,
  },

  { name: "Friends", href: "/friends", icon: Users, comp: <Friends /> },
  { name: "Request", href: "/request", icon: UserPlus, comp: <Request /> },
];

export default function DesktopSidebar() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-20 flex justify-center">
      <nav className=" mt-4 flex flex-col items-center gap-y-2 w-full ">
        {routes.map((item, index) => (
          <DesktopSidebarItem
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
  );
}
