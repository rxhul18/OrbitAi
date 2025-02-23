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
    <div className="h-fit p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6 md:mt-35 lg:mt-40 mt-30">
      <ChatBox msgs={msgs} />
        <ChatInput chatId={chatID} onHasMessagesChange={setMsg} onMessageResponse={setMsgs} />
        {/* Filter tabs */}
        {msgs.length <= 0 && <DataViwer />}
      </div>
    </div>
  )
}