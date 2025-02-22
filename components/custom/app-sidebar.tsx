"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  // SidebarHeader,
} from "@/components/ui/sidebar"
// import Link from "next/link"
import UserBtn from "./user-btn"
// import OrbitLogo from "./logo";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="h-full border-none">
      {/* <SidebarHeader className="min-w-full justify-center ">
        <Link href={"/"} className="flex justify-center items-center gap-2 select-none py-3">
          <OrbitLogo/>
          <span className="text-xl font-bold">Orbit-Ai</span>
        </Link>
      </SidebarHeader> */}
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <UserBtn/>
      </SidebarFooter>
    </Sidebar>
  )
}
