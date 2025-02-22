'use client';
import ChatInput from "@/components/custom/chat/chat-input"
import OrbitLoadingScreen from "@/components/custom/loading-screen";
import DataViwer from "@/components/custom/resources"
import { useAuth } from "@/context/auth.context";
import { getUserCurrenChat } from "@/func/func";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
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
      router.push(`/c/${chatID}`);
    }
  }, [chatID, isMsg, router]);

  // Conditional rendering based on chatID
  if (!chatID) {
    return <OrbitLoadingScreen />;
  }
  return (
    <div className="h-fit p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6 mt-48">
        <h2 className="w-full text-center text-6xl py-16 font-serif">How can i help you dear?</h2>
        <ChatInput chatId={chatID} onHasMessagesChange={setMsg}/>
        {/* Filter tabs */}
        <DataViwer />
      </div>
    </div>
  )
}