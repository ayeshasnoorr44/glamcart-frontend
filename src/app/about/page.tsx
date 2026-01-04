'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Sparkles, Heart, Users, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-5xl font-bold font-headline">About Glamify</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Revolutionizing the way you discover and experience beauty with cutting-edge virtual try-on technology.
        </p>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-headline">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At Glamify, we believe every person deserves to feel confident and beautiful. Our mission is to make makeup shopping an interactive, personalized experience through innovative AI-powered virtual try-on technology.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              We've curated a collection of premium makeup products from world-class brands, all available in one place. With our virtual try-on feature, you can find your perfect shade before you buy.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="h-20 w-20 text-primary mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">Beauty Reimagined</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16 bg-card rounded-lg my-8">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Quality First</h3>
            <p className="text-muted-foreground">
              We partner only with premium, trusted brands that meet our rigorous quality standards.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Customer Centric</h3>
            <p className="text-muted-foreground">
              Your satisfaction is our priority. We're committed to providing exceptional service and support.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-muted-foreground">
              Constantly evolving with the latest technology to enhance your beauty shopping experience.
            </p>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Choose Glamify?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                ✓
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Virtual Try-On Technology</h3>
              <p className="text-muted-foreground">
                See how products look on you before purchasing with our advanced virtual try-on feature.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                ✓
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Curated Collections</h3>
              <p className="text-muted-foreground">
                Hand-picked products from trusted brands, all reviewed and rated by our community.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                ✓
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Expert Recommendations</h3>
              <p className="text-muted-foreground">
                AI-powered suggestions based on your preferences and skin tone.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                ✓
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Easy Returns</h3>
              <p className="text-muted-foreground">
                We stand behind our products with a hassle-free return policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 font-headline">Ready to Find Your Perfect Shade?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Explore our collection of premium makeup and experience the future of beauty shopping.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg" variant="default">
            <Link href="/products">Shop Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/try-on">Try Virtual Try-On</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
