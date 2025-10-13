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
      {product.image && (
  <img
    src={`http://localhost:5000${product.image}`}
    alt={product.name}
    className="h-48 w-full object-cover rounded mb-4"
  />
)}

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