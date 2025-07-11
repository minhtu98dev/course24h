"use client";

import { usePagination } from "@/hooks/usePagination";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Pagination from "./Pagination";
import { Product } from "@/data/products";
import { RotateCcw } from "lucide-react";

type ProductListProps = {
  products: Product[];
  onViewDetails: (product: Product) => void;
  isSuggesting?: boolean;
  suggestionError?: boolean; // <- 🛠 Dòng cần thiết!
  suggestedProducts?: Product[] | null;
  onClearSuggestions?: () => void;
};

export default function ProductList({
  products,
  onViewDetails,
  isSuggesting = false,
  suggestionError = false,
  suggestedProducts,
  onClearSuggestions,
}: ProductListProps) {
  const ITEMS_PER_PAGE = 8;
  const dataToDisplay = suggestedProducts ?? products;

  const { paginatedItems, currentPage, totalPages, setCurrentPage } =
    usePagination(dataToDisplay, ITEMS_PER_PAGE);

  if (isSuggesting) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (suggestionError) {
    return (
      <div className="text-center text-red-500">
        <RotateCcw className="mx-auto h-12 w-12" />
        <p className="mt-4 text-xl font-semibold">Đã có lỗi xảy ra !</p>
        <p>Xin hãy thử lại</p>
      </div>
    );
  }

  if (dataToDisplay.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p className="text-xl font-semibold">Không tìm thấy sản phẩm phù hợp</p>
      </div>
    );
  }

  return (
    <>
      {suggestedProducts && !isSuggesting && !suggestionError && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Gợi ý từ AI cho bạn
          </h2>
          {onClearSuggestions && (
            <button
              onClick={onClearSuggestions}
              className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300"
            >
              ← Quay lại danh sách
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
