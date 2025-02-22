"use client"

import * as React from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, ArrowUp} from "lucide-react"
import OrbitLogo from "@/components/custom/logo"
import ChatInput from "@/components/custom/chat-input"

interface Message {
  id: number
  content: string
  sender: "user" | "bot"
}

const DUMMY_RESPONSES = [
  "I understand your question. Let me help you with that!",
  "That's an interesting point. Here's what I think...",
  "Based on my knowledge, I can provide the following information...",
  "I'd be happy to assist you with that request.",
  "Let me break this down for you in a simple way...",
]

export default function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      content: "Hello",
      sender: "user",
    },
    {
      id: 2,
      content:
        'It looks like we\'ve had a friendly conversation already. You\'ve said "Hello" and "Hi" earlier. I\'m happy to chat with you again. How can I assist you today?',
      sender: "bot",
    },
    {
      id: 1,
      content: "I need Boobs",
      sender: "user",
    },
    {
      id: 1,
      content: "Really? Nigga i m a bot!",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [showScrollTop, setShowScrollTop] = React.useState(false)

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement
    setShowScrollTop(target.scrollTop > 100)
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }, 100)
  }

  const getDummyResponse = () => {
    const randomIndex = Math.floor(Math.random() * DUMMY_RESPONSES.length)
    return DUMMY_RESPONSES[randomIndex]
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue.trim(),
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add bot response
    const botMessage: Message = {
      id: messages.length + 2,
      content: getDummyResponse(),
      sender: "bot",
    }
    setMessages((prev) => [...prev, botMessage])
    setIsLoading(false)
    scrollToBottom()
  }

  // Automatically scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex overflow-hidden h-full justify-center items-center flex-col bg-background text-white">
      <ScrollArea ref={scrollRef} className="flex-1 p-6 md:py-6" onScroll={handleScroll}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.sender === "user" ? "order-1" : "order-2"}`}>
                {message.sender === "bot" && (
                  <div className="mb-2 flex items-center gap-2">
                    <OrbitLogo />
                    <span className="font-semibold">Orbit Ai</span>
                    <Badge variant="secondary" className="h-5 bg-zinc-800">
                      Bot
                    </Badge>
                  </div>
                )}
                <Card className={`p-3 ${message.sender === "user" ? "bg-zinc-800" : "bg-zinc-800/50"}`}>
                  <p className="text-sm">{message.content}</p>
                </Card>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] order-2">
                <div className="mb-2 flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-zinc-800">
                    <Bot className="h-4 w-4" />
                  </Avatar>
                  <span className="font-semibold">Orbit Ai</span>
                  <Badge variant="secondary" className="h-5 bg-zinc-800">
                    Bot
                  </Badge>
                </div>
                <Card className="bg-zinc-800/50 p-3">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-zinc-400"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 w-full">
        <form onSubmit={handleSubmit} className="relative">
          <ChatInput />
        </form>
        <p className="mt-2 text-center text-xs text-zinc-500">Orbit Ai can make mistakes rarely. Check important info.</p>
      </div>

      {showScrollTop && (
        <Button
          size="icon"
          variant="secondary"
          className="fixed bottom-20 right-4 rounded-full bg-zinc-800 hover:bg-zinc-700"
          onClick={scrollToTop}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}