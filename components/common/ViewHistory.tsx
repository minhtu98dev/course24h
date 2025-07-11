"use client";

import { History } from "lucide-react";
import { useHistory } from "@/hooks/useHistory";
import { Product } from "@/data/products";
import Link from "next/link";

type ViewHistoryProps = {
  onHistoryItemClick: (product: Product) => void;
};

export default function ViewHistory({ onHistoryItemClick }: ViewHistoryProps) {
  const { history } = useHistory();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 rounded-lg bg-white p-4 shadow">
      <Link href="/history" className="flex items-center gap-2 ">
        <History className="h-5 w-5 text-gray-600" />
        <h2 className="font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
          Đã xem gần đây
        </h2>
        <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs text-white">
          {history.length}
        </span>
      </Link>
      <div className="mt-4 flex flex-wrap gap-2">
        {history.map((product, index) => (
          <button
            key={product.id}
            onClick={() => onHistoryItemClick(product)}
            className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-800 transition-colors hover:bg-gray-200"
          >
            <span className="font-bold text-gray-500">{index + 1}. </span>
            {product.name}
          </button>
        ))}
      </div>
    </div>
  );
}
