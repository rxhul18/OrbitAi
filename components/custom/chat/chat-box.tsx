import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import OrbitLogo from "../logo";
import ShinyText from "@/components/magicui/shiny-text";
import { Message } from "ai/react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const MarkdownContent = ({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-md my-2"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        ) : (
          <code className="bg-zinc-700/50 px-1.5 py-0.5 rounded text-sm" {...props}>
            {children}
          </code>
        );
      },
      // Add custom styling for other markdown elements
      h1: ({ children }) => <h1 className="text-2xl font-bold my-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-xl font-bold my-3">{children}</h2>,
      h3: ({ children }) => <h3 className="text-lg font-bold my-2">{children}</h3>,
      p: ({ children }) => <p className="text-sm my-2">{children}</p>,
      ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
      li: ({ children }) => <li className="text-sm ml-2">{children}</li>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-zinc-600 pl-4 my-2 italic text-zinc-400">
          {children}
        </blockquote>
      ),
      a: ({ href, children }) => (
        <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
      table: ({ children }) => (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-zinc-700">{children}</table>
        </div>
      ),
      th: ({ children }) => (
        <th className="px-4 py-2 text-left text-sm font-semibold bg-zinc-700/50">{children}</th>
      ),
      td: ({ children }) => (
        <td className="px-4 py-2 text-sm border-t border-zinc-700">{children}</td>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

const processStreamingContent = (content: string) => {
  const parts = [];
  let currentStr = '';
  let isThinking = false;
  let i = 0;

  while (i < content.length) {
    if (content.slice(i, i + 7) === '<think>') {
      if (currentStr) {
        parts.push({ type: 'text', content: currentStr });
        currentStr = '';
      }
      isThinking = true;
      i += 7;
    } else if (content.slice(i, i + 8) === '</think>') {
      if (currentStr) {
        parts.push({ type: 'think', content: currentStr });
        currentStr = '';
      }
      isThinking = false;
      i += 8;
    } else {
      currentStr += content[i];
      i++;
    }
  }

  if (currentStr) {
    parts.push({ 
      type: isThinking ? 'think' : 'text', 
      content: currentStr 
    });
  }

  return { parts, isThinking };
};

export default function ChatBox({ msgs }: { msgs?: Message[] }) {
  return (
    <div className="h-[calc(80vh-200px)]">
      <ScrollArea className="h-full max-w-5xl py-6">
        <div className="space-y-4">
          {msgs?.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${message.role === "user" ? "order-1" : "order-2"}`}>
                {message.role === "assistant" && (
                  <div className="mb-2 flex items-center gap-2">
                    <OrbitLogo size={30} />
                    <span className="font-semibold text-lg">Orbit AI</span>
                    <Badge variant="secondary" className="h-5">
                      DeepSeek-R1
                    </Badge>
                  </div>
                )}
                <Card 
                  className={`p-4 ${
                    message.role === "user" ? "bg-zinc-800" : "bg-zinc-800/50"
                  }`}
                >
                  {(() => {
                    const { parts } = processStreamingContent(message.content);
                    return (
                      <div className="space-y-2">
                        {parts.map((part, index) => (
                          part.type === 'think' ? (
                            <div key={index} className="text-zinc-500 italic">
                              "{part.content}"
                            </div>
                          ) : (
                            <div key={index}>
                              <MarkdownContent content={part.content} />
                            </div>
                          )
                        ))}
                      </div>
                    );
                  })()}
                </Card>
              </div>
            </div>
          )) || (
            <ShinyText
              text="How can I help you dear?"
              disabled={false}
              speed={5}
              className="w-full text-center text-6xl py-16 font-serif"
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}