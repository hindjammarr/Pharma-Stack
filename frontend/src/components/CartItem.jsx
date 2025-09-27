import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  maxStock = 99,
  onQuantityChange,
  onRemove
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > maxStock) return;

    setIsUpdating(true);
    console.log(`Updating quantity for ${id} to ${newQuantity}`);
    onQuantityChange(id, newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const handleRemove = () => {
    console.log(`Removing item ${id} from cart`);
    onRemove(id);
  };

  const total = price * quantity;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Product image */}
          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-2xl">💊</span>
            )}
          </div>
          
          {/* Product info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate" data-testid={`text-cart-item-name-${id}`}>
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {price.toFixed(2)} € / unité
            </p>
          </div>
          
          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating}
              data-testid={`button-decrease-${id}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <Input
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                handleQuantityChange(newQuantity);
              }}
              className="w-16 text-center h-8"
              min={1}
              max={maxStock}
              disabled={isUpdating}
              data-testid={`input-quantity-${id}`}
            />
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxStock || isUpdating}
              data-testid={`button-increase-${id}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Price and remove */}
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg" data-testid={`text-total-${id}`}>
              {total.toFixed(2)} €
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={handleRemove}
              data-testid={`button-remove-${id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
