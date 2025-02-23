"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar"
import UserBtn from "../user-btn"
import OrbitLogo from "../logo";
import Link from "next/link";
// import { SearchInSpace } from "./serach-space";
import SearchHistory from "./search-history";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { HistoryChat } from "./history-viewer";

export function AppSidebar() {
  const {
    state,
  } = useSidebar()
  return (
    <Sidebar variant="sidebar" className="h-full border-none">
      {state == "expanded"} {
        <SidebarHeader className="min-w-full border-b">
        <Link href={"/"} className="flex justify-center items-center gap-4 select-none py-3">
          <OrbitLogo size={35} />
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/90 bg-clip-text text-center text-3xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Orbit Ai
          </span>
        </Link>
      </SidebarHeader>
      }
      <SidebarContent className="min-w-full">
        <SidebarGroup className="w-full py-1">
          <SearchHistory />
        </SidebarGroup>
        <SidebarGroup className="w-full h-full flex justify-start py-0">
          <HistoryChat />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="w-full">
        <Button className="rounded-sm" variant={"secondary"} onClick={() => window.location.href = "/chat"}><SquarePen/> New Chat</Button>
        <UserBtn />
      </SidebarFooter>
    </Sidebar>
  )
}
