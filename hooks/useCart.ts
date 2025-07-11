// File: hooks/useCart.ts
'use client';

import { useContext } from 'react';
import { CartContext } from '@/context/CartProvider';

// Hook này chỉ dùng để lấy dữ liệu từ Context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}