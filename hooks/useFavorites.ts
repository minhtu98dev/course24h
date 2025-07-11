'use client';

import { useContext } from 'react';
import { FavoritesContext, FavoritesContextType } from '../context/FavoritesProvider';

export function useFavorites(): FavoritesContextType {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}