// File: app/cart/page.tsx
"use client";

import { useCart } from "@/hooks/useCart";

import Image from "next/image";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";
import { formatPrice } from "@/utils/formatters";
import PageHeader from "@/components/ui/PageHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EmptyState from "@/components/ui/EmptyState";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();
  const router = useRouter();
  const handleCheckout = () => {
    toast.success("Thanh toán thành công! Cảm ơn bạn đã mua khóa học.");
    clearCart();
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl  px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader title="Giỏ hàng của bạn" />
        <ScrollReveal>
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
                  <button
                    onClick={handleCheckout}
                    className="mt-6 w-full rounded-md bg-gray-700 py-3 font-semibold text-white hover:bg-gray-900"
                  >
                    Tiến hành thanh toán
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<ShoppingCart className="h-16 w-16" />}
              title="Giỏ hàng của bạn đang trống"
              description="Hãy bắt đầu khám phá và thêm các khóa học bạn quan tâm nhé!"
              buttonText="Khám phá khóa học"
              buttonLink="/"
            />
          )}
        </ScrollReveal>
      </div>
    </main>
  );
}
