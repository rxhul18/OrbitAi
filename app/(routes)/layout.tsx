import { AppSidebar } from "@/components/custom/sidebar/app-sidebar"
import { SignInNavbar } from "@/components/custom/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("orbit_sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="w-full h-full">
        <SignInNavbar />
        <div className="flex h-[calc(100vh-80px)] justify-center overflow-hidden">
          <div className="container border border-dashed border-t-0 bg-background">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout;