'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { productsAPI } from '@/lib/api';

interface Brand {
  name: string;
  productCount: number;
  avgRating: number;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        const products = response.data.data || response.data || [];

        // Group products by brand
        const brandMap = new Map<string, { products: any[]; avgRating: number }>();

        products.forEach((product: any) => {
          if (!brandMap.has(product.brand)) {
            brandMap.set(product.brand, { products: [], avgRating: 0 });
          }
          const brand = brandMap.get(product.brand)!;
          brand.products.push(product);
        });

        // Calculate average rating for each brand
        const brandsArray = Array.from(brandMap.entries()).map(([name, data]) => ({
          name,
          productCount: data.products.length,
          avgRating: data.products.reduce((sum: number, p: any) => sum + (p.rating || 0), 0) / data.products.length,
        }));

        // Sort by product count
        brandsArray.sort((a, b) => b.productCount - a.productCount);
        setBrands(brandsArray);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const featuredBrands = [
    {
      name: 'MAC',
      description: 'Professional-grade makeup loved by artists worldwide.',
      logo: '💄',
    },
    {
      name: 'Charlotte Tilbury',
      description: 'Luxury makeup with a focus on timeless elegance.',
      logo: '✨',
    },
    {
      name: 'Nars',
      description: 'Bold, high-quality makeup for every skin tone.',
      logo: '🎨',
    },
    {
      name: 'Bobbi Brown',
      description: 'Natural, wearable makeup for everyday beauty.',
      logo: '🌟',
    },
    {
      name: 'Urban Decay',
      description: 'Edgy, innovative makeup for creative expression.',
      logo: '⚡',
    },
    {
      name: 'Anastasia Beverly Hills',
      description: 'Expert eyebrow and eye makeup formulations.',
      logo: '👁️',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold font-headline mb-6">Our Brands</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover premium makeup from the world's most trusted beauty brands. Each brand is hand-picked for quality and excellence.
        </p>
      </section>

      {/* Featured Brands Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 font-headline">Featured Brands</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBrands.map((brand) => (
            <Card key={brand.name} className="p-8 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{brand.logo}</div>
              <h3 className="text-2xl font-bold mb-3">{brand.name}</h3>
              <p className="text-muted-foreground mb-6">{brand.description}</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/products?brand=${encodeURIComponent(brand.name)}`}>
                  Shop {brand.name}
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* All Brands List */}
      {!loading && brands.length > 0 && (
        <section className="container mx-auto px-4 py-16 bg-card rounded-lg my-8">
          <h2 className="text-3xl font-bold mb-12 font-headline">All Brands</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="p-4 border rounded-lg hover:bg-primary/5 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{brand.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm">{brand.avgRating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {brand.productCount} product{brand.productCount !== 1 ? 's' : ''}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 font-headline">Explore Premium Beauty</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find your favorite brands and discover new products with our virtual try-on feature.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Shop All Products</Link>
        </Button>
      </section>
    </div>
  );
}
