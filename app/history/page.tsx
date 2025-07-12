"use client";

import { useState } from "react";

import { History as HistoryIcon } from "lucide-react";
import ProductList from "@/components/common/ProductList";
import ProductDetailModal from "@/components/common/ProductDetailModal";
import { useHistory } from "@/hooks/useHistory";
import { Product } from "@/data/products";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

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
          <PageHeader title="Lịch sử đã xem" />
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
            <EmptyState
              icon={<HistoryIcon className="h-16 w-16" />}
              title="Lịch sử xem của bạn trống"
              description="Hãy bắt đầu khám phá và thêm các khóa học bạn quan tâm nhé!"
              buttonText="Khám phá khóa học"
              buttonLink="/"
            />
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
