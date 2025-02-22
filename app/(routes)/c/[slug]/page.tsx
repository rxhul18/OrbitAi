"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ArrowUp } from "lucide-react"
import OrbitLogo from "@/components/custom/logo"
import ChatInput from "@/components/custom/chat/chat-input"
import React, { useEffect, useRef, useState } from "react"
import { Message } from "ai/react"
import ErrorPage from "next/error"
import { getChatBySlug } from "@/func/func"
import OrbitLoadingScreen from "@/components/custom/loading-screen"

interface PageProps {
  params: {
    slug: string
  }
}

export default function ChatInterface({ params }: PageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isChatValid, setIsChatValid] = useState(false)
  const [msgs, setMsgs] = useState<Message[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const chatID = params.slug.replace(/^\//, "")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchChatHistory() {
      setIsLoading(true)
      try {
        const isChat = await getChatBySlug(chatID)
        if (!isChat) return setIsChatValid(false)

        const response = await fetch("/api/history", {
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

    fetchChatHistory()
  }, [chatID])

  const scrollTo = (position: "top" | "bottom") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      top: position === "top" ? 0 : scrollRef.current.scrollHeight,
      behavior: "smooth"
    })
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    setShowScrollTop(target.scrollTop > 100)
  }

  useEffect(() => {
    scrollTo("bottom")
  }, [msgs])

  // if (isLoading) return <OrbitLoadingScreen />

  return (
    <div className="flex h-full overflow-hidden justify-center items-center flex-col bg-background text-white">
      <ScrollArea ref={scrollRef} className="flex-1 max-w-5xl py-6" onScroll={handleScroll}>
        <div className="space-y-4">
          {msgs.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : "order-2"}`}>
                {message.role === "assistant" && (
                  <div className="mb-2 flex items-center gap-2">
                    <OrbitLogo />
                    <span className="font-semibold">Orbit Ai</span>
                    <Badge variant="secondary" className="h-5 bg-zinc-800">Bot</Badge>
                  </div>
                )}
                <Card className={`p-3 ${message.role === "user" ? "bg-zinc-800" : "bg-zinc-800/50"}`}>
                  <p className="text-sm">{message.content}</p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

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
