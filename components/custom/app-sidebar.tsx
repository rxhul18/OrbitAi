import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
// import { BotIcon } from "lucide-react"
import Link from "next/link"
import { AcountDetail } from "./account-detail"

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="h-full">
      <SidebarHeader className="min-w-full justify-center ">
        <Link href={"/"} className="flex justify-center items-center gap-2 select-none py-3">
          {/* <BotIcon className="w-10 h-10 text-[#6466f1]" /> */}
          <span className="text-xl font-semibold">Brainy</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <AcountDetail />
      </SidebarFooter>
    </Sidebar>
  )
}
