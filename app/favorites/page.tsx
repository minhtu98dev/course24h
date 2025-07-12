"use client";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { products as allProducts, Product } from "@/data/products";
import ProductList from "@/components/common/ProductList";
import ProductDetailModal from "@/components/common/ProductDetailModal";
import { Heart } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";

export default function FavoritesPage() {
  const { favoriteIds, clearFavorites } = useFavorites();
  const favoritedProducts = allProducts.filter((p) => favoriteIds.has(p.id));
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
          <PageHeader title=" Khóa học yêu thích" />
          {favoritedProducts.length > 0 && (
            <button
              onClick={clearFavorites}
              className="rounded-md px-4 py-2 text-sm font-semibold text-red-600 transition-all duration-200 hover:scale-105 hover:text-red-700"
            >
              Xóa toàn bộ yêu thích
            </button>
          )}
        </div>
        <ScrollReveal>
          {favoritedProducts.length > 0 ? (
            <ProductList
              products={favoritedProducts}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <EmptyState
              icon={<Heart className="h-16 w-16" />}
              title="Chưa có khóa học yêu thích nào"
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
