'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/data/products';


const getUniqueCategories = (products: Product[]) => {
  const categories = products
    .map(p => p.category)
    .filter(Boolean) as string[];
  return ['Tất cả', ...new Set(categories)];
};

export function useProductFilter(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [category, setCategory] = useState('Tất cả');

  const availableCategories = useMemo(
    () => getUniqueCategories(products),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === 'Tất cả' || product.category === category;

      const matchesPrice = (() => {
        switch (priceRange) {
          case '<500k':
            return product.price < 500_000;
          case '500k-1m':
            return product.price >= 500_000 && product.price <= 1_000_000;
          case '>1m':
            return product.price > 1_000_000;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, category, priceRange]);

  return {
    searchTerm,
    setSearchTerm,
    priceRange,
    setPriceRange,
    category,
    setCategory,
    availableCategories,
    filteredProducts,
  };
}
