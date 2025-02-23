'use client';
import ChatInput from "@/components/custom/chat/chat-input"
import OrbitLoadingScreen from "@/components/custom/loading-screen";
import DataViwer from "@/components/custom/resources"
import { useAuth } from "@/context/auth.context";
import { getUserCurrenChat } from "@/func/func";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShinyText from "@/components/magicui/shiny-text";
import ChatBox from "@/components/custom/chat/chat-box";
import { Message } from "ai/react"

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [msgs, setMsgs] = useState<Message[]>([])
  const uid = user?.id;
  const [chatID, setChatID] = useState<string | null>(null);
  const [isMsg, setMsg] = useState(false);

  useEffect(() => {
    const fetchChatID = async () => {
      const id = await getUserCurrenChat(uid!);
      if (!chatID) {
        setChatID(id);
      }
    };

    if (user) {
      fetchChatID();
    }
  }, [user, uid, chatID]);

  useEffect(() => {
    if (chatID && isMsg) {
      window.history.replaceState(null, "", `/c/${chatID}`);
    }
  }, [chatID, isMsg, router]);

  // Conditional rendering based on chatID
  if (!chatID) {
    return null;
  }
  return (
    <div className="flex h-auto overflow-hidden justify-center items-center flex-col bg-background text-white">
      <ChatBox msgs={msgs} />
      <div className="p-4 w-full px-auto">
        <ChatInput chatId={chatID} history={msgs} onMessageResponse={setMsgs} onHasMessagesChange={setMsg} />
        {msgs.length <= 0 ? <DataViwer /> : <p className="mt-2 text-center text-xs text-zinc-500">
          Orbit Ai can make mistakes rarely. Check important info.
        </p>}
      </div>
    </div>
  )
}