"use client";
import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Bot } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import ProductSuggestionCard from "./ProductSuggestionCard";

export default function ChatInterface() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    sendMessage(prompt);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full items-start gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "ai" && (
                <>
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-gray-600">
                    <Bot size={20} />
                  </div>
                  <div className="max-w-md rounded-lg bg-gray-100 px-4 py-3 text-gray-800">
                    <p className="text-[13px]">{msg.text}</p>
                    {msg.suggestions && (
                      <div className="mt-3 flex flex-col gap-2">
                        {msg.suggestions.map((p) => (
                          <ProductSuggestionCard key={p.id} product={p} />
                        ))}
                      </div>
                    )}
                    {msg.prompts && (
                      <div className="mt-3 flex flex-wrap gap-2 ">
                        {msg.prompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => handlePromptClick(prompt)}
                            disabled={isLoading}
                            className="rounded-xl text-start  border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {msg.role === "user" && (
                <div className="max-w-md text-[15px] rounded-lg bg-gray-500 px-4 py-3 text-white">
                  <p>{msg.text}</p>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Bot size={20} />
              </div>
              <div className="max-w-lg rounded-lg bg-gray-100 px-4 py-2">
                <div className="flex items-center gap-1.5 py-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-300 bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 rounded-full border-2 border-gray-400 bg-white p-1 pr-2 shadow-sm"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hỏi AI về khóa học bạn muốn tìm..."
            className="w-full flex-grow bg-transparent px-4 py-2 text-gray-800 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="flex h-9 w-9  items-center justify-center rounded-full bg-gray-200 text-gray-600 transition-colors hover:bg-gray-300 "
            disabled={isLoading || !input.trim()}
          >
            <SendHorizonal size={20} className="cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
}
