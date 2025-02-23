import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { RoutesContext } from "@/context/route.context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orbit-Ai - Your Personal Ai with your own Knowledge Vault",
  description:
    "Effortlessly store, recall, and connect all your knowledge with Brain",
  keywords: [
    "Saidev Dhal",
    "Rahul Shah",
    "Chat with pdf",
    "Chat with website",
    "Chat with csv",
    "Orbit Ai",
    "Ai",
    "Gpt",
    "Personal ai assistant",
    "Chat with ai",
    "Chat with gpt",
    "Chat with x0-gpt",
    "Chat with x0 gpt",
  ],
  authors: [
    {
      name: "Saidev Dhal",
      url: "https://devwtf.in",
    },
    {
      name: "Rahul Shah",
      url: "https://x.com/mindpuzzledev",
    },
  ],
  creator: "Saidev Dhal",
  openGraph: {
    images: [
      {
        url: "https://i.imgur.com/ffeIgzW.png",
        width: 1200,
        height: 627,
        alt: "Orbit-Ai - Your Personal Ai with your own Knowledge Vault",
      },
    ],
  },
  metadataBase: {
    host: "https://x0-gpt.devwtf.in",
    href: "/",
    origin: "https://x0-gpt.devwtf.in",
    password: "x0-gpt",
    hash: "x0-gpt",
    pathname: "/",
    search: "",
    username: "devwtf",
    hostname: "x0-gpt.devwtf.in",
    port: "",
    protocol: "https:",
    searchParams: new URLSearchParams(""),
    toString: () => "https://x0-gpt.devwtf.in/",
    toJSON: () => "https://x0-gpt.devwtf.in/",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://x0-gpt.devwtf.in",
    creator: "https://x0-gpt.devwtf.in",
    title: "Orbit-Ai - Your Personal Ai with your own Knowledge Vault",
    description:
      "Explore and interact with any WEBPAGE, PDF, CSV, TXT and many more effortlessly using x0-GPT, the free AI-powered tool designed for everyone.",
    images: [
      {
        url: "https://i.imgur.com/ffeIgzW.png",
        width: 1200,
        height: 627,
        alt: "Orbit-Ai - Your Personal Ai with your own Knowledge Vault",
      },
    ],
  },
};

const protectedRoutes = ["/chat", "/memories", "/c", "/spaces"];
const publicRoutes = ["/"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
            forcedTheme="dark"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RoutesContext>
        <Toaster />
      </body>
    </html>
  );
}
