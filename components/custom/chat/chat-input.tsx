"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/auth.context";
import { getChatBySlug, storeChat } from "@/func/func";
import { Message, useChat } from "ai/react";
import { ArrowUp, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import FileUploadComp from "../file-uploader";
import { SpaceComp } from "../select-space";

export default function ChatInput({
  chatId,
  history,
  onHasMessagesChange,
  onMessageResponse,
}: {
  chatId: string;
  history?: Message[];
  onHasMessagesChange?: (hasMessages: boolean) => void;
  onMessageResponse?: (msgs: Message[]) => void;
}) {
  const { user } = useAuth();
  const uid = user?.id;
  const [thisSpace, setThisSpace] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const form = document.querySelector("form");
        if (form) {
          form.requestSubmit();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { messages, handleInputChange, handleSubmit, input, isLoading } =
    useChat({
      api: "/api/ai/stream",
      body: { chatId, namespace: thisSpace },
      initialMessages: history,
    });
  console.log("spaceXXX:", thisSpace);
  console.log("ChatIDD:", messages);

  useEffect(() => {
    const storeChatData = async (title: string) => {
      const isSlug = await getChatBySlug(chatId);
      if (!isSlug) {
        storeChat(uid!, chatId, title);
      }
    };
    if (messages.length) {
      const title = messages[0].content;
      const tits = title.length > 30 ? `${title.slice(0, 30)}...` : title;
      storeChatData(tits);
      if (onHasMessagesChange) {
        onHasMessagesChange(true);
      }
      if (onMessageResponse) {
        if (messages.length < 2) {
          setTimeout(() => {
            onMessageResponse(messages);
          }, 1350);
        } else {
          onMessageResponse(messages);
        }
      }
    }
  }, [messages, uid, chatId, onHasMessagesChange, onMessageResponse]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full pb-4 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-5xl bg-[#1c1c1c] rounded-md">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Was mach ich in Berlin wenn es regnet?"
          className="w-full bg-[#1c1c1c] border-none text-white resize-none placeholder:text-gray-400 p-3  rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="w-full flex justify-between p-3">
          <div className="flex flex-row gap-2">
            <FileUploadComp disabled={isLoading} />
            <SpaceComp
              placeHolder="Ask your Space"
              onSpaceSelect={(space) => setThisSpace(space)}
            />
          </div>
          <div className="gap-2 flex">
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-[#2c2c2c] hover:bg-[#3c3c3c] border-none"
            >
              <Mic className="h-8 w-8 text-gray-400" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-[#2c2c2c] hover:bg-[#3c3c3c] border-none"
              disabled={input === "" || isLoading}
            >
              <ArrowUp className="h-8 w-8 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
