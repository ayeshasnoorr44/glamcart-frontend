'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { brands as allBrands, categories as allCategories } from '@/lib/products';
import { productsAPI } from '@/lib/api';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProductGrid } from './product-grid';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '../ui/button';

interface Product {
  _id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  colors: Array<{
    name: string;
    hex: string;
    imageUrl?: string;
  }>;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

type ProductFiltersProps = {
  allProducts?: Product[];
};

export function ProductFilters({ allProducts: initialProducts }: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [categories, setCategories] = useState<string[]>(searchParams.get('category') ? [searchParams.get('category')!] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number]>([200]);
  const [rating, setRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const response = await productsAPI.getAll();
          // Backend returns { success, count, data: [...] }
          // axios wraps response in response.data, so we need response.data.data
          const products = response.data?.data || [];
          console.log('Fetched products:', products);
          setAllProducts(products);
        } catch (error) {
          console.error('Failed to fetch products:', error);
          setAllProducts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [initialProducts]);

  // Update search query when URL params change
  useEffect(() => {
    const newSearchQuery = searchParams.get('search') || '';
    setSearchQuery(newSearchQuery);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch = categories.length === 0 || categories.includes(product.category);
      const brandMatch = brands.length === 0 || brands.includes(product.brand);
      const priceMatch = product.price <= priceRange[0];
      const ratingMatch = product.rating >= rating;
      const searchMatch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && brandMatch && priceMatch && ratingMatch && searchMatch;
    });
  }, [allProducts, categories, brands, priceRange, rating, searchQuery]);
  
  const handleCategoryChange = (category: string) => {
    setCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleBrandChange = (brand: string) => {
    setBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setCategories([]);
    setBrands([]);
    setPriceRange([200]);
    setRating(0);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <Card className="p-6 sticky top-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-headline font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
          </div>
          <Accordion type="multiple" defaultValue={['category', 'brand', 'price', 'rating']} className="w-full">
            <AccordionItem value="category">
              <AccordionTrigger className="text-base">Category</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {allCategories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`cat-${category}`} checked={categories.includes(category)} onCheckedChange={() => handleCategoryChange(category)} />
                      <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brand">
              <AccordionTrigger className="text-base">Brand</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {allBrands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={`brand-${brand}`} checked={brands.includes(brand)} onCheckedChange={() => handleBrandChange(brand)} />
                      <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="price">
              <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4">
                  <Slider
                    defaultValue={[200]}
                    max={200}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number])}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>$0</span>
                    <span>${priceRange[0]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rating">
              <AccordionTrigger className="text-base">Rating</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="0" onValueChange={(value) => setRating(Number(value))} className="pt-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4.5" id="r1" />
                    <Label htmlFor="r1" className="font-normal">4.5 stars & up</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r2" />
                    <Label htmlFor="r2" className="font-normal">4 stars & up</Label>
                  </div>
                   <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="r3" />
                    <Label htmlFor="r3" className="font-normal">Any</Label>
                  </div>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </aside>

      <main className="lg:col-span-3">
        <ProductGrid products={filteredProducts} loading={loading} />
      </main>
    </div>
  );
}
