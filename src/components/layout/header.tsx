"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingBag, Sparkles, User, LogOut } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { logout, getUser } from "@/lib/auth";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-48 h-8"
      />
      <Button type="submit" variant="ghost" size="icon" aria-label="Search">
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/try-on", label: "Virtual Try-On" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  const { cart } = useCart();
  const [user, setUser] = useState<any>(null);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    // Get user from localStorage on mount
    const userData = getUser();
    setUser(userData);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-headline">Glamify</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SearchBar />
          {user ? (
            <>
              <div className="text-sm hidden md:block text-muted-foreground">
                {user.name}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="icon" aria-label="Login">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Shopping cart">
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2">
                     <Sparkles className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold font-headline">Glamify</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
