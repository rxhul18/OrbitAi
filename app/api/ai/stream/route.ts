import { ragChat } from "@/lib/rag";
import { NextRequest } from "next/server";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

export const POST = async (req: NextRequest) => {
  const { messages, chatId, namespace } = await req.json();
  const disableRAG = !namespace;

  console.log("Namespace:", namespace);
  console.log("Disable RAG:", disableRAG);

  const lastMsg = messages[messages.length - 1].content;
  const res = await ragChat.chat(lastMsg, {
    namespace: namespace,
    streaming: true,
    sessionId: chatId,
    historyLength: 100,
    historyTTL: 604_800,
    similarityThreshold: 0.7,
    onContextFetched: (context) => {
      console.log("Retrieved context:", context);
      return context;
    },
    disableRAG: disableRAG,
  });

  return aiUseChatAdapter(res);
};
