'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from './product-card';
import type { Product } from '@/lib/products';
import { productsAPI } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

type ProductGridProps = {
  products?: Product[];
};

export function ProductGrid({ products: initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await productsAPI.getAll();
          setProducts(response.data.data || []);
        } catch (err) {
          console.error('Failed to fetch products:', err);
          setError('Failed to load products');
          // Fallback to sample data
          setProducts([
            {
              _id: '1',
              id: '1',
              name: 'Rouge Volupté',
              brand: 'YSL',
              description: 'Creamy, moisturizing lipstick',
              price: 38,
              colors: [
                { name: 'Beige Trench', hex: '#C4A69D' },
                { name: 'Rouge Volupté', hex: '#D4486B' }
              ],
              category: 'Lipstick',
              rating: 4.8,
              reviewCount: 143,
              stock: 20,
              imageUrl: 'https://picsum.photos/seed/fallback-lipstick/800/800',
              imageHint: 'Fallback product photo'
            }
          ]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [initialProducts]);

  if (loading) {
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

  if (error && products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">No Products Found</h2>
        <p className="text-muted-foreground mt-2">
          {error}. Make sure the backend is running on port 5000.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
