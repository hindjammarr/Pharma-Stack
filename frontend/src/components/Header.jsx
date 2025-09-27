import { Link, useLocation } from "wouter";
import { ShoppingCart, User, Menu, Search, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";

export function Header() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock cart count - à remplacer par ton state réel
  const cartCount = 3;

  const isActive = (path) => location === path;

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/produits", label: "Produits" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top info bar */}
      <div className="bg-primary text-primary-foreground px-4 py-2 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>01 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Lun-Sam: 8h-20h | Dim: 9h-18h</span>
            </div>
          </div>
          <div className="text-sm">
            🚑 Pharmacie de garde: Pharmacie Central - 01 98 76 54 32
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">PharmaCare</span>
              <span className="text-xs text-muted-foreground">Votre santé, notre priorité</span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un médicament..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild>
                <Link href="/compte">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Mon compte</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/panier">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                  <span className="sr-only">Panier</span>
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 mt-4 pt-4 border-t">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button 
                variant={isActive(item.path) ? "default" : "ghost"}
                className="font-medium"
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t space-y-2">
            <div className="pb-4">
              <Input 
                placeholder="Rechercher..." 
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button 
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-4 border-t">
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild>
                <Link href="/compte">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/panier">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
