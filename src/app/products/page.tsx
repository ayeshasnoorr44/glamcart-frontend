'use client';

import { Suspense } from 'react';
import { ProductFilters } from '@/components/product/product-filters';
import { Skeleton } from '@/components/ui/skeleton';

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

function ProductsPageContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">Product Collection</h1>
        <p className="mt-2 text-lg text-muted-foreground">Only the best, 4+ star rated products from world-class brands.</p>
      </div>
      <ProductFilters allProducts={undefined} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductLoadingSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}
