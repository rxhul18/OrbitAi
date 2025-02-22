import { redis } from "@/db/upstash/redis";
import { RAGChat, togetherai } from "@upstash/rag-chat";

const ragChat = new RAGChat({
  model: togetherai("deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free"),
  redis: redis,
  debug: true,
  promptFn: ({ context, question, chatHistory }) =>
    `You are Orbit Ai, a personal & user's private AI assistant created by Saidev Dhal & Rahul Shah.
     Use the provided context and chat history to answer the question. Please try not to hallucinate while replying.
     If the answer or context isn't available, politely inform the user to disable RAG or just choose to provide appropiate resources.
     ------
     Chat history:
     ${chatHistory}
     ------
     Context:
     ${context}
     ------
     Question: ${question}
     Answer (with no repeatations or hallaucinations):`,
});

async function AddPDFContext(namespace: string, src: string) {
  const res = await fetch(src);
  const buffer = await res.blob();
  await ragChat.context.add({
    type: "pdf",
    fileSource: buffer,
    pdfConfig: { splitPages: true },
    options: { namespace: namespace },
  });
  return true;
}

async function AddTXTContext(namespace: string, data: string) {
  await ragChat.context.add({
    type: "text",
    data: data,
    options: { namespace: namespace },
  });
  return true;
}

async function AddCSVContext(namespace: string, src: string) {
  await ragChat.context.add({
    type: "csv",
    fileSource: src,
    options: { namespace: namespace },
  });
  return true;
}

async function AddWEBContext(namespace: string, src: string) {
  await ragChat.context.add({
    type: "html",
    source: src,
    config: { chunkOverlap: 50, chunkSize: 200 },
    options: { namespace: namespace },
  });
  return true;
}

async function GetChatHistory(chatId: string) {
  const MsgsHistory = await ragChat.history.getMessages({
    sessionId: chatId,
    amount: 100,
  });
  return MsgsHistory;
}

export {
  ragChat,
  GetChatHistory,
  AddCSVContext,
  AddPDFContext,
  AddTXTContext,
  AddWEBContext,
};