'use client';

import { Suspense } from 'react';
import { ProductFilters } from '@/components/product/product-filters';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata = {
  title: 'All Products | Glamify',
  description: 'Explore our curated collection of premium lipsticks and eyeshadows from top brands.',
};

function ProductLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Product Collection</h1>
        <p className="mt-2 text-lg text-muted-foreground">Only the best, 4+ star rated products from world-class brands.</p>
      </div>
      <Suspense fallback={<ProductLoadingSkeleton />}>
        <ProductFilters allProducts={undefined} />
      </Suspense>
    </div>
  );
}
