"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { formatPrice } from "@/utils/formatters";

export default function ProductSuggestionCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 rounded-lg border border-gray-300 bg-white p-3 transition-shadow hover:shadow-md"
      aria-label={`Xem chi tiết ${product.name}`}
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-gray-900 ">{product.name}</p>
        <p className="mt-1 text-sm font-bold text-blue-500">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
