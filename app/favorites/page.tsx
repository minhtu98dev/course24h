"use client";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { products as allProducts, Product } from "@/data/products";
import ProductList from "@/components/common/ProductList";
import ProductDetailModal from "@/components/common/ProductDetailModal";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

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
          <div className="flex items-center gap-4">
            <Link href="/">
              <ArrowLeft className="h-6 w-6 hover:scale-110 transform duration-300" />
            </Link>
            <h4 className="text-md font-bold tracking-tight text-gray-900 md:text-2xl">
              Khóa học yêu thích
            </h4>
          </div>
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
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <Heart className="h-16 w-16 text-gray-400" />
              <p className="mt-4 text-xl font-semibold text-gray-700">
                Chưa có khóa học yêu thích nào
              </p>

              <Link
                href="/"
                className="mt-6 rounded-md bg-gray-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-900"
              >
                Khám phá khóa học
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
