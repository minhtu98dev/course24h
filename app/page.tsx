"use client";

import { useState } from "react";
import { products as allProducts, Product } from "@/data/products";

import SearchAndFilter from "@/components/common/SearchAndFilter";
import ViewHistory from "@/components/common/ViewHistory";
import ProductDetailModal from "@/components/common/ProductDetailModal";
import ProductList from "@/components/common/ProductList";

import { useProductFilter } from "@/hooks/useProductFilter";
import { useAiSuggestions } from "@/hooks/useAiSuggestions";
import { useHistory } from "@/hooks/useHistory";
import Slider from "@/components/common/Slider";
import { slides } from "@/data/slide";
import ScrollReveal from "@/components/ui/ScrollReveal";
export default function HomePage() {
  const { filteredProducts, ...filterProps } = useProductFilter(allProducts);
  const {
    isSuggesting,
    suggestionError,
    suggestedProducts,
    triggerSuggestion,
    clearSuggestions,
  } = useAiSuggestions();
  const { addProductToHistory } = useHistory();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    addProductToHistory(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Slider slides={slides} />

        <div className="relative z-20">
          <SearchAndFilter
            searchTerm={filterProps.searchTerm}
            onSearchChange={filterProps.setSearchTerm}
            selectedPrice={filterProps.priceRange}
            onPriceChange={filterProps.setPriceRange}
            selectedCategory={filterProps.category}
            onCategoryChange={filterProps.setCategory}
            availableCategories={filterProps.availableCategories}
            isSuggesting={isSuggesting}
            onAiSuggestClick={triggerSuggestion}
          />
        </div>

        <ViewHistory onHistoryItemClick={handleViewDetails} />
        <div className="mt-8">
          <ScrollReveal delay={0.2}>
            <ProductList
              products={filteredProducts}
              onViewDetails={handleViewDetails}
              isSuggesting={isSuggesting}
              suggestionError={!!suggestionError}
              suggestedProducts={suggestedProducts}
              onClearSuggestions={clearSuggestions}
            />
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal>
        <ProductDetailModal
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      </ScrollReveal>
    </main>
  );
}
