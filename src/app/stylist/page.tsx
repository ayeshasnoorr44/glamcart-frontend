'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Sparkles, Palette, Heart, Zap } from 'lucide-react';

export default function StylistPage() {
  const steps = [
    {
      number: 1,
      title: 'Tell Us Your Preferences',
      description: 'Answer quick questions about your style, skin tone, and favorite colors.',
      icon: Palette,
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our AI analyzes your preferences and skin characteristics for personalized recommendations.',
      icon: Sparkles,
    },
    {
      number: 3,
      title: 'Curated Recommendations',
      description: 'Get a personalized collection of products perfectly matched to your style.',
      icon: Heart,
    },
    {
      number: 4,
      title: 'Virtual Try-On',
      description: 'Try on recommended products virtually before making your purchase.',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-5xl font-bold font-headline">AI Beauty Stylist</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get personalized makeup recommendations powered by artificial intelligence. Find products that match your unique style and complexion.
        </p>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <Card className="p-8 h-full flex flex-col">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6 mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-semibold mb-3">Step {step.number}</h3>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </Card>
                {step.number < 4 && (
                  <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <div className="text-primary text-2xl">→</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 bg-card rounded-lg my-8">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Use Our AI Stylist?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-3">🎯 Personalized</h3>
            <p className="text-muted-foreground">
              Get recommendations tailored to your unique skin tone, undertones, and personal style preferences.
            </p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-3">⚡ Fast & Easy</h3>
            <p className="text-muted-foreground">
              Answer a few simple questions and get instant recommendations without leaving your home.
            </p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-3">💯 Accurate</h3>
            <p className="text-muted-foreground">
              Powered by advanced machine learning to ensure recommendations match your preferences perfectly.
            </p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-3">🛍️ Shop Smart</h3>
            <p className="text-muted-foreground">
              Make confident purchasing decisions with AI-backed recommendations from trusted brands.
            </p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-3">📱 Try Before Buy</h3>
            <p className="text-muted-foreground">
              Use virtual try-on to see how recommended products look on you before purchasing.
            </p>
          </Card>
          <Card className="p-8">
            <h3 className="text-xl font-semibold mb-3">🔄 Always Learning</h3>
            <p className="text-muted-foreground">
              The more you use it, the better it gets at understanding your preferences and style.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 font-headline">Ready for Personalized Recommendations?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Let our AI beauty stylist help you find products that match your unique style and complexion.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild size="lg" variant="default">
            <Link href="/products">Start Shopping</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/try-on">Try Virtual Try-On</Link>
          </Button>
        </div>
      </section>

      {/* Note */}
      <section className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          💡 Tip: Use the filters on our products page to narrow down by brand, category, and price range for a curated shopping experience.
        </p>
      </section>
    </div>
  );
}
