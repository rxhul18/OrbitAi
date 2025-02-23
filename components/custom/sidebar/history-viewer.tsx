/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { format } from "date-fns"
import { History, MoreHorizontal, Trash2 } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"
import { deleteChat, getChatsByUserId } from "@/func/func"
import { toast } from "sonner"
import { useAuth } from "@/context/auth.context"
import Link from "next/link"

interface HistInt {
  name: string;
  slug: string;
  created: string;
}

export function HistoryChat() {
  const [chatHistory, setChatHistory] = React.useState<HistInt[]>([])
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChatDel = async (id: string) => {
    try {
      await deleteChat(id);
      setChatHistory(prev => prev.filter(chat => chat.slug !== id));
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Failed to delete chat. Please try again.");
    }
  };

  React.useEffect(() => {
    const fetchAllHistory = async () => {
      if (user && chatHistory.length === 0) {
        setIsLoading(true);
        try {
          const historyData = await getChatsByUserId(user.id);
          if (historyData) {
            const formattedHist = historyData.map((chat: any) => ({
              slug: chat.slug,
              name: chat.title,
              created: chat.created_at,
            }));

            setChatHistory(formattedHist);
          }
        } catch (error) {
          console.error("Error fetching history list:", error);
          toast.error("Failed to fetch history list. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        if (!user) {
          setChatHistory([]);
        }
      }
    };

    fetchAllHistory();
  }, [user, chatHistory.length]);

  return (
    <div className="space-y-2 w-full border-t h-full overflow-y-auto">
      {isLoading ? (
        <span className="flex w-full items-center justify-center my-5 text-muted-foreground">
          <History className="size-6 mr-2 animate-spin-counterclockwise" />
          Loading...
        </span>
      ) : chatHistory.length === 0 ? (
        <span className="flex w-full items-center justify-center my-5 text-muted-foreground">
          No history available
        </span>
      ) : (
        chatHistory.map((item) => (
          <ContextMenu key={item.slug}>
            <ContextMenuTrigger>
            <Link href={`/c/${item.slug}`} passHref>
              <div className="flex items-center justify-between p-2 hover:bg-zinc-800/50 rounded-lg cursor-pointer my-1">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-zinc-400">{format(item.created, "MMM dd, yyyy")}</p>
                </div>
                <Button variant="secondary" size="icon" className="size-5">
                  <MoreHorizontal className="h-4 w-4 text-zinc-400" />
                </Button>
              </div>
              </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                className="text-red-500 focus:text-red-500 focus:bg-red-500/10"
                onClick={() => handleChatDel(item.slug)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))
      )}
    </div>
  )
}