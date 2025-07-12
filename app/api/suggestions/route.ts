// File: app/api/suggestions/route.ts
import { NextResponse } from 'next/server';
import { products as allProducts } from '@/data/products';
function handleError(error: unknown): NextResponse {
  const message = error instanceof Error ? error.message : 'An internal server error occurred';
  return new NextResponse(
    JSON.stringify({ message }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST(request: Request) {
  try {
    const { historyIds, favoriteIds,cartIds  } = await request.json();
    await new Promise(resolve => setTimeout(resolve, 1000));
    const interactedIds = new Set([...historyIds, ...favoriteIds, ...cartIds]);
    const interactedProducts = allProducts.filter(p => interactedIds.has(p.id));

    if (interactedProducts.length > 0) {
      const suggestionCount = Math.min(interactedProducts.length, Math.floor(Math.random() * 2) + 2);
      const suggestions = interactedProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, suggestionCount);
      return NextResponse.json(suggestions);
    }
     if (Math.random() < 0.3) {
      return new NextResponse(
        JSON.stringify({}), 
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const randomCount = Math.floor(Math.random() * 2) + 2;
    const randomProducts = allProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, randomCount);
    return NextResponse.json(randomProducts);
  } catch (error: unknown) {
    return handleError(error);
  }
}