"use client";

import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { toast } from "sonner";

const FAVORITES_STORAGE_KEY = "course24h-favorites";

export type FavoritesContextType = {
  favoriteIds: Set<string>;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const isInitialRender = useRef(true);
  const toastLockRef = useRef(false);
  useEffect(() => {
    try {
      const storedIdsJSON = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedIdsJSON) {
        setFavoriteIds(new Set(JSON.parse(storedIdsJSON)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(Array.from(favoriteIds))
      );
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favoriteIds]);

  const toggleFavorite = useCallback((productId: string) => {
    let willAdd = false;

    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
        willAdd = true;
      }
      return next;
    });

    if (!toastLockRef.current) {
      toastLockRef.current = true;
      setTimeout(() => {
        toast.success(
          willAdd
            ? "Đã thêm vào danh sách yêu thích!"
            : "Đã xóa khỏi danh sách yêu thích!"
        );
        setTimeout(() => {
          toastLockRef.current = false;
        }, 300);
      }, 0);
    }
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.has(productId),
    [favoriteIds]
  );

  const clearFavorites = useCallback(() => {
    if (favoriteIds.size > 0) {
      setFavoriteIds(new Set());
      localStorage.removeItem(FAVORITES_STORAGE_KEY);
      toast.success("Đã xóa toàn bộ danh sách yêu thích!");
    }
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, toggleFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
