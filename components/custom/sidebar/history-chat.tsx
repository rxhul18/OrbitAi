"use client"

import * as React from "react"
import { format } from "date-fns"
import { MoreVertical, Trash2 } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"

interface ChatHistoryItem {
  id: string
  title: string
  date: Date
}

const mockChatHistory: ChatHistoryItem[] = [
  { id: "1", title: "Chat about Tailwind CSS", date: new Date("2023-10-01") },
  { id: "2", title: "Discussion on React Hooks", date: new Date("2023-10-05") },
  { id: "3", title: "Project Planning", date: new Date("2023-10-03") },
  { id: "1", title: "Chat about Tailwind CSS", date: new Date("2023-10-01") },
  { id: "2", title: "Discussion on React Hooks", date: new Date("2023-10-05") },
  { id: "3", title: "Project Planning", date: new Date("2023-10-03") },
  { id: "1", title: "Chat about Tailwind CSS", date: new Date("2023-10-01") },
  { id: "2", title: "Discussion on React Hooks", date: new Date("2023-10-05") },
  { id: "3", title: "Project Planning", date: new Date("2023-10-03") },
  { id: "1", title: "Chat about Tailwind CSS", date: new Date("2023-10-01") },
  { id: "2", title: "Discussion on React Hooks", date: new Date("2023-10-05") },
  { id: "3", title: "Project Planning", date: new Date("2023-10-03") },
  { id: "1", title: "Chat about Tailwind CSS", date: new Date("2023-10-01") },
  { id: "2", title: "Discussion on React Hooks", date: new Date("2023-10-05") },
  { id: "3", title: "Project Planning", date: new Date("2023-10-03") },
  { id: "1", title: "Chat about Tailwind CSS", date: new Date("2023-10-01") },
  { id: "2", title: "Discussion on React Hooks", date: new Date("2023-10-05") },
  { id: "3", title: "Project Planning", date: new Date("2023-10-03") },
]

export function HistoryChat() {
  const [chatHistory, setChatHistory] = React.useState<ChatHistoryItem[]>(mockChatHistory)

  // Sort chat history by date (newest first)
  const sortedChatHistory = React.useMemo(() => {
    return [...chatHistory].sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [chatHistory])

  // Delete a chat item by id
  const deleteChatItem = (id: string) => {
    setChatHistory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-2 w-full border-t h-full overflow-y-auto "> 
      {sortedChatHistory.map((item) => (
        <ContextMenu key={item.id}>
          <ContextMenuTrigger>
            <div className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-lg cursor-pointer">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-zinc-400">{format(item.date, "MMM dd, yyyy")}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-4 w-4 text-zinc-400" />
              </Button>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="text-red-500 focus:text-red-500 focus:bg-red-500/10"
              onClick={() => deleteChatItem(item.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  )
}