"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingBag, Sparkles, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { isAuthenticated } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check authentication on component mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
          console.log('✅ User loaded from localStorage:', userData);
        } catch (e) {
          console.error('Failed to parse user data:', e);
          setUser(null);
        }
      }
    }
  }, []);

  // Listen for login event from other components
  useEffect(() => {
    const handleUserLogin = () => {
      console.log('👂 Login event detected');
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
          console.log('✅ Header updated with user:', userData);
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }
    };

    window.addEventListener('user-logged-in', handleUserLogin);
    return () => window.removeEventListener('user-logged-in', handleUserLogin);
  }, []);

  // Listen for storage changes (e.g., from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  // Don't render user info until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold font-headline">Glamify</span>
          </Link>
        </div>
      </header>
    );
  }

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
          {user && isAuthenticated() ? (
            <>
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-semibold">Welcome, {user.name}!</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    {user.role === 'admin' && (
                      <p className="text-xs text-primary font-semibold mt-1">👑 Admin</p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/cart">Shopping Cart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                  {user && isAuthenticated() ? (
                    <>
                      <div className="border-t pt-4">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <Button 
                          variant="destructive" 
                          className="mt-4 w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/login">Sign In</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
