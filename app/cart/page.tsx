// File: app/cart/page.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Minus, ShoppingCart, X } from "lucide-react";
import { formatPrice } from "@/utils/formatters";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice } =
    useCart();

  return (
    <main className="bg-gray-50 min-h-screen">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl  px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8 gap-4">
            <Link href="/">
              <ArrowLeft className="h-6 w-6 hover:scale-110 transform duration-300" />
            </Link>
            <h4 className="text-md font-bold tracking-tight text-gray-900 md:text-2xl">
              Giỏ hàng của bạn
            </h4>
          </div>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="space-y-4 lg:col-span-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-full  p-1.5 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-full  p-1.5 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Tóm tắt đơn hàng */}
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
                  <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span>Tổng sản phẩm</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Tổng tiền</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full rounded-md bg-gray-700 py-3 font-semibold text-white hover:bg-gray-900">
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Giỏ hàng của bạn đang trống
              </p>

              <Link
                href="/"
                className="mt-6 rounded-md bg-gray-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-900"
              >
                Khám phá khóa học
              </Link>
            </div>
          )}
        </div>
      </ScrollReveal>
    </main>
  );
}
