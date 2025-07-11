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
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="group flex items-center gap-2" // Dùng 'group' để tạo hiệu ứng cho các phần tử con
          aria-label="Về trang chủ Course24h"
        >
          {/* Icon với hiệu ứng xoay khi hover */}
          <GraduationCap className="h-8 w-8 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />

          {/* Tên logo với màu gradient */}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent">
            Course24h
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-8 text-sm font-medium text-gray-700">
            <li>
              <Link
                href="/favorites"
                className="relative flex items-center gap-1 hover:text-red-600"
              >
                <Heart size={18} />
                <span className="hidden md:inline relative">
                  Yêu thích
                  {favoriteCount > 0 && (
                    <span className="absolute -top-3 -right-5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs text-white shadow">
                      {favoriteCount}
                    </span>
                  )}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="relative flex items-center gap-1 hover:text-red-600"
              >
                <ShoppingCart size={18} />
                <span className="hidden md:inline relative">
                  Giỏ hàng
                  {totalItems > 0 && (
                    <span className="absolute -top-3 -right-5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-400 text-xs text-white shadow">
                      {totalItems}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
