import { AppSidebar } from "@/components/custom/app-sidebar"
import { SignInNavbar } from "@/components/custom/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <SignInNavbar />
        <div className="w-full h-full flex justify-center">
          <div className="container border border-dashed border-t-0 p-2 bg-background">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
