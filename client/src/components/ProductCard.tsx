import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  category?: string;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  stock,
  image,
  category,
  onAddToCart,
  onViewDetails
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    console.log(`Adding product ${id} to cart`);
    onAddToCart?.(id);
    setTimeout(() => setIsAdding(false), 500);
  };
  
  const getStockStatus = () => {
    if (stock === 0) return { label: "Rupture", variant: "destructive" as const };
    if (stock < 10) return { label: "Stock faible", variant: "secondary" as const };
    return { label: "En stock", variant: "default" as const };
  };
  
  const stockStatus = getStockStatus();
  
  return (
    <Card className="group hover-elevate transition-all duration-200">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-50">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground text-4xl">💊</span>
            </div>
          )}
          
          {category && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              {category}
            </Badge>
          )}
          
          <Badge 
            className="absolute top-2 right-2" 
            variant={stockStatus.variant}
          >
            {stockStatus.label}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
          
          {description && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
              {price.toFixed(2)} €
            </span>
            <span className="text-sm text-muted-foreground">
              Stock: {stock}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails?.(id)}
          data-testid={`button-view-${id}`}
        >
          <Eye className="h-4 w-4 mr-2" />
          Détails
        </Button>
        
        <Button 
          size="sm" 
          className="flex-1"
          onClick={handleAddToCart}
          disabled={stock === 0 || isAdding}
          data-testid={`button-add-cart-${id}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isAdding ? "Ajout..." : "Ajouter"}
        </Button>
      </CardFooter>
    </Card>
  );
}