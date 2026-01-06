'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product/product-details';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/lib/products';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://glamcart-api.ddns.net';
        const response = await fetch(`${apiUrl}/api/products/${params.id}`);
        
        if (!response.ok) {
          setNotFoundState(true);
          return;
        }
        
        const data = await response.json();
        const prod = data.data || data;
        setProduct(prod);
        
        // Fetch all products to find related ones
        const allRes = await fetch(`${apiUrl}/api/products`);
        const allData = await allRes.json();
        const allProducts = allData.data || [];
        
        const related = allProducts
          .filter((p: Product) => p.category === prod.category && (p.id !== prod.id && p._id !== prod._id))
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setNotFoundState(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (notFoundState) {
    notFound();
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full mb-8" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
