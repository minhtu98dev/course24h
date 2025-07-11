// File: app/history/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, History as HistoryIcon } from "lucide-react";
import ProductList from "@/components/common/ProductList";
import ProductDetailModal from "@/components/common/ProductDetailModal";
import { useHistory } from "@/hooks/useHistory";
import { Product } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function HistoryPage() {
  const { history, clearHistory } = useHistory();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
  };
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeft className="h-6 w-6 hover:scale-110 transform duration-300" />
            </Link>
            <h1 className="text-md font-bold tracking-tight text-gray-900 md:text-xl">
              Lịch sử đã xem
            </h1>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="rounded-md px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:scale-105 hover:text-red-700"
            >
              Xóa toàn bộ lịch sử
            </button>
          )}
        </div>
        <ScrollReveal>
          {history.length > 0 ? (
            <ProductList products={history} onViewDetails={handleViewDetails} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <HistoryIcon className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Lịch sử xem của bạn trống
              </p>

              <Link
                href="/"
                className="mt-6 rounded-md bg-gray-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-900"
              >
                Bắt đầu khám phá
              </Link>
            </div>
          )}
        </ScrollReveal>
      </div>

      <ProductDetailModal
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </main>
  );
}
