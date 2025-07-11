"use client";
import { Search, Bot } from "lucide-react";
import Dropdown from "./Dropdown";

const priceOptions = [
  { value: "all", label: "Tất cả giá" },
  { value: "<500k", label: "Dưới 500K" },
  { value: "500k-1m", label: "500K - 1 triệu" },
  { value: ">1m", label: "Trên 1 triệu" },
];

type SearchAndFilterProps = {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableCategories: string[];
  onAiSuggestClick: () => void;
  isSuggesting: boolean;
};

export default function SearchAndFilter({
  searchTerm,
  onSearchChange,
  selectedPrice,
  onPriceChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
  onAiSuggestClick,
  isSuggesting,
}: SearchAndFilterProps) {
  const categoryOptions = availableCategories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  return (
    <div className="relative z-10 mb-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex w-full flex-1 items-center gap-2 rounded-md border border-gray-300 px-3 py-2  ">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <Dropdown
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categoryOptions}
        />
        <Dropdown
          value={selectedPrice}
          onChange={onPriceChange}
          options={priceOptions}
        />

        <button
          onClick={onAiSuggestClick}
          disabled={isSuggesting}
          className="flex w-full  cursor-pointer items-center justify-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 sm:w-auto"
        >
          <Bot className="h-4 w-4 mr-1" />
          <span>Gợi ý AI</span>
        </button>
      </div>
    </div>
  );
}
