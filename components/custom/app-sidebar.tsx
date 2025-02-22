"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from "@/components/ui/sidebar"
import UserBtn from "./user-btn"
import OrbitLogo from "./logo";
import { Link } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="h-full border-none">
      <SidebarHeader className="min-w-full">
        <Link href={"/"} className="flex justify-center items-center gap-2 select-none py-3">
          <OrbitLogo/>
          <span className="text-xl font-bold text-secondary">Orbit-Ai</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="w-full">
        <UserBtn/>
      </SidebarFooter>
    </Sidebar>
  )
}
