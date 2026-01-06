'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
  id?: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl?: string;
  colors?: Array<{
    name: string;
    hex: string;
    imageUrl?: string;
  }>;
  category: string;
  stock?: number;
  rating: number;
  reviewCount?: number;
  reviews?: number;
}

type ProductFiltersProps = {
  allProducts?: Product[];
};

export function ProductFilters({ allProducts: initialProducts }: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number]>([500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('search') || '');

  // Fetch all products from API
  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://glamcart-api.ddns.net';
          
          // Always fetch ALL products first to build filter options
          const response = await fetch(`${apiUrl}/api/products`);
          const data = await response.json();
          const products = data.data || [];
          console.log(`✅ Fetched ${products.length} total products from API`);
          
          setAllProducts(products);
          
          // Extract unique categories and brands from fetched products
          const uniqueCategories = [...new Set(products.map((p: Product) => p.category))].filter(Boolean).sort();
          const uniqueBrands = [...new Set(products.map((p: Product) => p.brand))].filter(Boolean).sort();
          
          console.log('Available categories:', uniqueCategories);
          console.log('Available brands:', uniqueBrands);
          
          setAvailableCategories(uniqueCategories);
          setAvailableBrands(uniqueBrands);
        } catch (error) {
          console.error('❌ Failed to fetch products:', error);
          setAllProducts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      // If initial products provided, extract categories and brands from them
      const uniqueCategories = [...new Set(initialProducts.map((p: Product) => p.category))].filter(Boolean).sort();
      const uniqueBrands = [...new Set(initialProducts.map((p: Product) => p.brand))].filter(Boolean).sort();
      setAvailableCategories(uniqueCategories);
      setAvailableBrands(uniqueBrands);
    }
  }, [initialProducts]);

  // Apply all filters
  const filteredProducts = useMemo(() => {
    console.log('Filtering with:', { selectedCategory, selectedBrands, priceRange, minRating, searchQuery });
    
    const filtered = allProducts.filter(product => {
      // Category filter (case-insensitive)
      if (selectedCategory) {
        if (product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }
      
      // Brand filter
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) {
          return false;
        }
      }
      
      // Price filter
      if (product.price > priceRange[0]) {
        return false;
      }
      
      // Rating filter
      if (product.rating < minRating) {
        return false;
      }
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) && !product.brand.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      return true;
    });
    
    console.log(`✅ After filtering: ${filtered.length} products`);
    return filtered;
  }, [allProducts, selectedCategory, selectedBrands, priceRange, minRating, searchQuery]);
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setPriceRange([500]);
    setMinRating(0);
    setSearchQuery('');
  };

  // Get max price from products for slider
  const maxPrice = useMemo(() => {
    if (allProducts.length === 0) return 500;
    return Math.ceil(Math.max(...allProducts.map(p => p.price)) / 10) * 10;
  }, [allProducts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <Card className="p-6 sticky top-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-headline font-semibold">Filters</h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
          </div>
          <Accordion type="multiple" defaultValue={['category', 'brand', 'price', 'rating']} className="w-full">
            {/* Category Filter */}
            <AccordionItem value="category">
              <AccordionTrigger className="text-base">Category</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {availableCategories.length > 0 ? (
                    availableCategories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`cat-${category}`} 
                          checked={selectedCategory === category}
                          onCheckedChange={() => handleCategoryChange(category)}
                        />
                        <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Loading categories...</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Brand Filter */}
            <AccordionItem value="brand">
              <AccordionTrigger className="text-base">Brand</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {availableBrands.length > 0 ? (
                    availableBrands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Loading brands...</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="pt-4">
                  <Slider
                    value={priceRange}
                    max={maxPrice}
                    min={0}
                    step={5}
                    onValueChange={(value) => setPriceRange(value as [number])}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>$0</span>
                    <span>${priceRange[0]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rating Filter */}
            <AccordionItem value="rating">
              <AccordionTrigger className="text-base">Rating</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={String(minRating)} onValueChange={(value) => setMinRating(Number(value))} className="pt-2 space-y-1">
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
                    <Label htmlFor="r3" className="font-normal">Any Rating</Label>
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
