import { LucideIcon } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface DesktopSidebarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function MobileNavbar({
  name,
  href,
  icon: Icon,
}: DesktopSidebarItemProps) {
  const pathname = location.pathname;
  const isActive = pathname.startsWith(href);
  return (
    <Link to={href} className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "outline",
              }),
              "w-14 h-14",
              isActive && "bg-muted-foreground "
            )}
          >
            {<Icon size={40} className={cn(isActive && "text-green-400")} />}
          </TooltipTrigger>

          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div
        className={cn(
          "absolute bottom-0 opacity-0 bg-muted-foreground w-full h-1 transition-all",
          isActive && "opacity-100 "
        )}
      />
    </Link>
  );
}
