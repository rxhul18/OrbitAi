"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowUp } from "lucide-react"
import OrbitLogo from "@/components/custom/logo"
import ChatInput from "@/components/custom/chat/chat-input"
import React, { use, useEffect, useRef, useState } from "react"
import { Message } from "ai/react"
import ErrorPage from "next/error"
import { getChatBySlug } from "@/func/func"
import OrbitLoadingScreen from "@/components/custom/loading-screen"
import ChatBox from "@/components/custom/chat/chat-box"


export default function ChatInterface({ params }: { params: Promise<{ slug: string }> }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isChatValid, setIsChatValid] = useState(false)
  const [msgs, setMsgs] = useState<Message[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { slug } = use(params);
  const chatID = slug.replace(/^\//, "");
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchChatHistory() {
      setIsLoading(true)
      try {
        const isChat = await getChatBySlug(chatID)
        if (!isChat) return setIsChatValid(false)

        const response = await fetch("/api/ai/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chatID })
        })

        if (!response.ok) throw new Error("Failed to fetch chat history")

        const chatHistory = await response.json()
        setMsgs(chatHistory)
        setIsChatValid(true)
      } catch (error) {
        console.error(error)
        setIsChatValid(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChatHistory();
  }, [chatID])

  const scrollTo = (position: "top" | "bottom") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      top: position === "top" ? 0 : scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    scrollTo("bottom")
  }, [msgs])

  if (isLoading) return <OrbitLoadingScreen />

  return (
    <div className="flex h-full overflow-hidden justify-center items-center flex-col bg-background text-white">
      <ChatBox msgs={msgs} />

      <div className="p-4 w-full">
        <ChatInput chatId={chatID} history={msgs} onMessageResponse={setMsgs} />
        <p className="mt-2 text-center text-xs text-zinc-500">
          Orbit Ai can make mistakes rarely. Check important info.
        </p>
      </div>

      {showScrollTop && (
        <Button
          size="icon"
          variant="secondary"
          className="fixed bottom-20 right-4 rounded-full bg-zinc-800 hover:bg-zinc-700"
          onClick={() => scrollTo("top")}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
