'use client';

import { useState, useEffect, useMemo } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedItems, totalPages } = useMemo(() => {
    const total = Math.ceil(items.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginated = items.slice(start, end);
    return { paginatedItems: paginated, totalPages: total };
  }, [items, currentPage, itemsPerPage]);


  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
  };
}