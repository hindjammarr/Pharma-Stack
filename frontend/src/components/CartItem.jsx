// frontend/src/components/CartItem.jsx
import React from "react";

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow">
      <div>
        <h3 className="font-semibold">{item.product.name}</h3>
        <p className="text-gray-600">
          Quantité: {item.quantity} x {item.product.price.toFixed(2)} €
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-semibold">
          {(item.product.price * item.quantity).toFixed(2)} €
        </span>
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 font-semibold"
          aria-label={`Supprimer ${item.product.name} du panier`}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default CartItem;