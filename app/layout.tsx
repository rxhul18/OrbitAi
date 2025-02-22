import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { RoutesContext } from "@/context/route.context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Orbit - Your Personal Knowledge Vault",
  description: "Effortlessly store, recall, and connect all your knowledge with Brain",
}

const protectedRoutes = ["/chat", "/memories", "/c", "/spaces"];
const publicRoutes = ["/"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={inter.className}>
      <RoutesContext
          protectedRoutes={protectedRoutes}
          publicRoutes={publicRoutes}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RoutesContext>
      </body>
    </html>
  )
}

