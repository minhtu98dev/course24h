'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { Product } from '@/data/products';
import { useHistory } from './useHistory';
import { useFavorites } from './useFavorites';
import { useCart } from './useCart';

export function useAiSuggestions() {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[] | null>(null);

  const { history } = useHistory();
  const { favoriteIds } = useFavorites();
  const { cartItems } = useCart();

  const triggerSuggestion = useCallback(async () => {
    setIsSuggesting(true);
    setSuggestionError(null);
    setSuggestedProducts(null);

    const historyIds = history.map((p) => p.id);
    const favoriteIdsArray = Array.from(favoriteIds);
    const cartIds = cartItems.map((p) => p.id);

    try {
      const res = await axios.post<Product[]>('/api/suggestions', {
        historyIds,
        favoriteIds: favoriteIdsArray,
        cartIds,
      });

      setSuggestedProducts(res.data);
    } catch (err: unknown) {
      let message = 'Unknown error';

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setSuggestionError(message);
    } finally {
      setIsSuggesting(false);
    }
  }, [history, favoriteIds, cartItems]);

  const clearSuggestions = useCallback(() => {
    setSuggestedProducts(null);
    setSuggestionError(null);
  }, []);

  return {
    isSuggesting,
    suggestionError,
    suggestedProducts,
    triggerSuggestion,
    clearSuggestions,
  };
}
