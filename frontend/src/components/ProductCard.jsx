// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { ShoppingCart, Eye } from "lucide-react";

// export function ProductCard({
//   id,
//   name,
//   description,
//   price,
//   stock,
//   image,
//   category,
//   onAddToCart,
//   onViewDetails
// }) {
//   const [isAdding, setIsAdding] = useState(false);

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     console.log(`Adding product ${id} to cart`);
//     onAddToCart && onAddToCart(id);
//     setTimeout(() => setIsAdding(false), 500); // Simule un délai pour UX
//   };

//   const getStockStatus = () => {
//     if (stock === 0) return { label: "Rupture", variant: "destructive" };
//     if (stock < 10) return { label: "Stock faible", variant: "secondary" };
//     return { label: "En stock", variant: "default" };
//   };

//   const stockStatus = getStockStatus();

//   return (
//     <Card className="group hover-elevate transition-all duration-200">
//       <CardContent className="p-0">
//         {/* Image produit */}
//         <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gray-50">
//           {image ? (
//             <img
//               src={image}
//               alt={name}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-muted">
//               <span className="text-muted-foreground text-4xl">💊</span>
//             </div>
//           )}

//           {/* Badge catégorie */}
//           {category && (
//             <Badge className="absolute top-2 left-2" variant="secondary">
//               {category}
//             </Badge>
//           )}

//           {/* Badge stock */}
//           <Badge className="absolute top-2 right-2" variant={stockStatus.variant}>
//             {stockStatus.label}
//           </Badge>
//         </div>

//         {/* Infos produit */}
//         <div className="p-4">
//           <h3
//             className="font-semibold text-lg mb-2 line-clamp-2"
//             data-testid={`text-product-name-${id}`}
//           >
//             {name}
//           </h3>

//           {description && (
//             <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
//               {description}
//             </p>
//           )}

//           <div className="flex items-center justify-between">
//             <span className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
//               {price.toFixed(2)} €
//             </span>
//             <span className="text-sm text-muted-foreground">Stock: {stock}</span>
//           </div>
//         </div>
//       </CardContent>

//       {/* Actions */}
//       <CardFooter className="p-4 pt-0 flex gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex-1"
//           onClick={() => onViewDetails && onViewDetails(id)}
//           data-testid={`button-view-${id}`}
//         >
//           <Eye className="h-4 w-4 mr-2" />
//           Détails
//         </Button>

//         <Button
//           size="sm"
//           className="flex-1"
//           onClick={handleAddToCart}
//           disabled={stock === 0 || isAdding}
//           data-testid={`button-add-cart-${id}`}
//         >
//           <ShoppingCart className="h-4 w-4 mr-2" />
//           {isAdding ? "Ajout..." : "Ajouter"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }


// frontend/src/components/ProductCard.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold">{product.price.toFixed(2)} €</span>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`px-3 py-1 rounded text-white font-semibold ${
            product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {product.stock === 0 ? "Rupture" : "Ajouter"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;