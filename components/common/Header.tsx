"use client";
import Link from "next/link";
import { GraduationCap, Heart, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

import { useCart } from "@/hooks/useCart";
export default function Header() {
  const { favoriteIds } = useFavorites();

  const favoriteCount = favoriteIds.size;

  const { totalItems } = useCart();
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="Về trang chủ Course24h"
        >
          <GraduationCap className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />

          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
            Course24h
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <li>
              <Link
                href="/favorites"
                className="relative flex items-center gap-1 rounded-md p-2 transition-colors hover:bg-gray-100"
              >
                <Heart size={18} />
                <span className="hidden md:inline">Yêu thích</span>

                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs font-bold text-white shadow">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="relative flex items-center gap-1 rounded-md p-2 transition-colors hover:bg-gray-100"
              >
                <ShoppingCart size={18} />
                <span className="hidden md:inline">Giỏ hàng</span>

                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs text-white shadow">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
