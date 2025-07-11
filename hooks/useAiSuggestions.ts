
'use client';

import { useState, useCallback } from 'react';
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
 const { cartItems  } = useCart();

  const triggerSuggestion = useCallback(async () => {
    setIsSuggesting(true);
    setSuggestionError(null);
    setSuggestedProducts(null);


    const historyIds = history.map(p => p.id);
    const favoriteIdsArray = Array.from(favoriteIds);
    const cartIds = cartItems.map(p => p.id);
    try {
     
      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ historyIds, favoriteIds: favoriteIdsArray,cartIds }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to fetch suggestions');
      }

      const data: Product[] = await res.json();
      setSuggestedProducts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setSuggestionError(message);
    } finally {
      setIsSuggesting(false);
    }
   
  }, [history, favoriteIds,cartItems]);


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