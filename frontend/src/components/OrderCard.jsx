import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Package, Eye } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function OrderCard({ id, createdAt, products, total, status, onViewDetails }) {
  const getStatusVariant = (status) => {
    switch (status) {
      case "pending": return "secondary";
      case "confirmed": return "default";
      case "shipped": return "default";
      case "delivered": return "default";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "pending": return "En attente";
      case "confirmed": return "Confirmée";
      case "shipped": return "Expédiée";
      case "delivered": return "Livrée";
      default: return "Inconnue";
    }
  };

  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg" data-testid={`text-order-id-${id}`}>
              Commande #{id.slice(-8).toUpperCase()}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <CalendarDays className="h-4 w-4" />
              <span>{format(createdAt, "d MMMM yyyy 'à' HH:mm", { locale: fr })}</span>
            </div>
          </div>

          <Badge variant={getStatusVariant(status)} data-testid={`badge-status-${id}`}>
            {getStatusLabel(status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Products summary */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>
              {totalItems} article{totalItems > 1 ? "s" : ""} • {products.length} produit
              {products.length > 1 ? "s" : ""}
            </span>
          </div>

          {/* Product list preview */}
          <div className="space-y-2">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between text-sm">
                <span className="truncate flex-1 mr-2">{product.name}</span>
                <span className="text-muted-foreground">
                  {product.quantity}x {product.price.toFixed(2)}€
                </span>
              </div>
            ))}

            {products.length > 3 && (
              <div className="text-sm text-muted-foreground">
                + {products.length - 3} autre{products.length - 3 > 1 ? "s" : ""} produit
                {products.length - 3 > 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Total and actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-lg font-semibold" data-testid={`text-order-total-${id}`}>
              Total: {total.toFixed(2)} €
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log(`Viewing details for order ${id}`);
                onViewDetails(id);
              }}
              data-testid={`button-view-order-${id}`}
            >
              <Eye className="h-4 w-4 mr-2" />
              Détails
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
