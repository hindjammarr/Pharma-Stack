import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";

export default function Produits() {
  // todo: remove mock functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const allProducts = [
    {
      id: "1",
      name: "Doliprane 1000mg",
      description: "Paracétamol pour douleurs et fièvre. Boîte de 20 comprimés.",
      price: 4.50,
      stock: 25,
      category: "Antalgiques",
      categoryId: "1"
    },
    {
      id: "2",
      name: "Vitamine C 500mg", 
      description: "Complément alimentaire. Boîte de 30 comprimés effervescents.",
      price: 8.90,
      stock: 15,
      category: "Vitamines",
      categoryId: "2"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Produits</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez notre large gamme de médicaments et produits de santé
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              stock={product.stock}
              category={product.category}
              onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
              onViewDetails={(id) => console.log(`Viewing product ${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
