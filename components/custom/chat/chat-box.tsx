import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import OrbitLogo from "../logo";
import ShinyText from "@/components/magicui/shiny-text";
import { Message } from "ai/react";

export default function ChatBox({ msgs }: { msgs?: Message[] }) {

  return (
    <div className="h-[calc(80vh-200px)]">
      <ScrollArea className="h-full max-w-5xl py-6">
        <div className="space-y-4">
          {msgs && msgs.length > 0 ? (
            msgs.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : "order-2"}`}>
                  {message.role === "assistant" && (
                    <div className="mb-2 flex items-center gap-2">
                      <OrbitLogo size={30} />
                      <span className="font-semibold text-lg">Orbit Ai</span>
                      <Badge variant="secondary" className="h-5">
                        DeepSeek-R1
                      </Badge>
                    </div>
                  )}
                  <Card className={`p-2 ${message.role === "user" ? "bg-zinc-800" : "bg-zinc-800/50"}`}>
                    <p className="text-sm">{message.content}</p>
                  </Card>
                </div>
              </div>
            ))
          ) : (
            <ShinyText text="How can I help you dear?" disabled={false} speed={5} className="w-full text-center text-6xl py-16 font-serif" />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}