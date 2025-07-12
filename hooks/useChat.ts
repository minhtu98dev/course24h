"use client";

import { useState, useCallback, useEffect } from "react";
import { Product, products as allProducts } from "@/data/products";

export type Message = {
  id: number;
  role: "user" | "ai";
  text: string;
  suggestions?: Product[];
  prompts?: string[];
};

const STORAGE_KEY = "edu-chat-messages";

async function getMockAiResponse(userMessage: string): Promise<Omit<Message, "id" | "role">> {
  const lowerCaseMessage = userMessage.toLowerCase();
  let responseText =
    "Rất tiếc, tôi chưa tìm thấy khóa học nào phù hợp. Bạn có thể thử các từ khóa khác như 'học React', 'luyện thi IELTS', hoặc 'thiết kế' xem sao nhé.";
  let suggestions: Product[] = [];

  const scoredProducts = allProducts.map((product) => {
    let score = 0;
    const productName = product.name.toLowerCase();
    const productDesc = product.shortDescription.toLowerCase();
    const productCategory = product.category?.toLowerCase() || "";
    const keywords = lowerCaseMessage.split(" ").filter((word) => word.length > 2);
    keywords.forEach((key) => {
      if (productName.includes(key)) score += 5;
      if (productDesc.includes(key)) score += 2;
      if (productCategory.includes(key)) score += 3;
    });
    return { ...product, score };
  });

  const relevantProducts = scoredProducts
    .filter((p) => p.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.rating ?? 0) - (a.rating ?? 0);
    });

  if (relevantProducts.length > 0) {
    suggestions = relevantProducts.slice(0, 3);
    responseText = `Tuyệt vời! Dựa trên yêu cầu của bạn, tôi đã tìm thấy các khóa học này có vẻ phù hợp nhất:`;
  }

  return { text: responseText, suggestions };
}

export function useChat() {
  const defaultWelcomeMessage: Message = {
    id: 1,
    role: "ai",
    text: "Xin chào! Tôi là trợ lý AI của EduPlatform. Tôi có thể giúp bạn tìm khóa học phù hợp. Bạn có thể bắt đầu bằng cách chọn một trong các gợi ý bên dưới hoặc tự đặt câu hỏi nhé:",
    prompts: [
      "Tìm khóa học về ReactJS",
      "Luyện thi IELTS cho người mới bắt đầu",
      "Học về tài chính cá nhân",
    ],
  };

  // ✅ Lazy init state từ localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as Message[];
        } catch {
          console.error("Failed to parse messages from localStorage");
        }
      }
    }
    return [defaultWelcomeMessage];
  });

  const [isLoading, setIsLoading] = useState(false);

  // ✅ Lưu vào localStorage mỗi khi messages thay đổi
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const aiResponseData = await getMockAiResponse(text);
    const aiMessage: Message = {
      id: Date.now() + 1,
      role: "ai",
      ...aiResponseData,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, sendMessage };
}
