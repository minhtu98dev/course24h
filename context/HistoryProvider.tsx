"use client";

import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { Product, products as allProducts } from "@/data/products";
import { toast } from "sonner";

const HISTORY_STORAGE_KEY = "course24h-history";
const MAX_HISTORY_LENGTH = 8;

export type HistoryContextType = {
  history: Product[];
  addProductToHistory: (product: Product) => void;
  clearHistory: () => void;
};

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const storedIdsJSON = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedIdsJSON) {
        const storedIds: string[] = JSON.parse(storedIdsJSON);
        const viewedProducts = storedIds
          .map((id) => allProducts.find((p) => p.id === id))
          .filter((p): p is Product => !!p);
        setHistory(viewedProducts);
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
    }
  }, []);

  useEffect(() => {
    const idsToStore = history.map((p) => p.id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(idsToStore));
  }, [history]);

  const addProductToHistory = useCallback((product: Product) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter((p) => p.id !== product.id);
      newHistory.unshift(product);
      return newHistory.slice(0, MAX_HISTORY_LENGTH);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    toast.error("Đã xóa toàn bộ lịch sử xem!");
  }, []);

  const value = { history, addProductToHistory, clearHistory };

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}
