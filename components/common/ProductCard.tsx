"use client";

import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { formatPrice } from "@/utils/formatters";
import { useFavorites } from "@/hooks/useFavorites";

type ProductCardProps = {
  product: Partial<Product>;
  onViewDetails: (product: Product) => void;
};

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = product.id ? isFavorite(product.id) : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.id) toggleFavorite(product.id);
  };

  return (
    <div
      onClick={() => product.id && onViewDetails(product as Product)}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:scale-101 hover:shadow-xl cursor-pointer"
    >
      <div className="relative h-48 w-full bg-gray-100">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name ?? "Course Image"}
            fill
            className="object-cover transition-transform duration-300 "
          />
        )}

        {product.category && (
          <span className="absolute left-2 top-2 rounded-xl border border-gray-200 bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
            {product.category}
          </span>
        )}

        {product.id && (
          <button
            onClick={handleFavoriteClick}
            className="absolute right-2 top-2 z-10 rounded-lg bg-gray-50 p-1 text-gray-700 cursor-pointer "
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                favorited ? "fill-red-500 text-red-400" : "text-gray-600"
              }`}
            />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex flex-col gap-2">
          {product.name && (
            <h3 className="text-md font-bold text-gray-900">{product.name}</h3>
          )}

          {product.shortDescription && (
            <p className="text-[12px] font-medium text-gray-600">
              {product.shortDescription}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            {product.price && (
              <div className="text-lg font-bold text-blue-500">
                {formatPrice(product.price)}
              </div>
            )}
            {product.rating && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                <span className="font-medium text-gray-800">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {product.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(product as Product);
              }}
              className="w-full rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 hover:bg-gray-900"
            >
              Xem chi tiết
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
