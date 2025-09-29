// frontend/src/pages/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/orders/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md text-center">
        <p>Votre panier est vide.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Mon Panier</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.product._id}
            item={item}
            onRemove={() => removeFromCart(item.product._id)}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Vider le panier
        </button>
        <div className="text-xl font-semibold">
          Total: {totalPrice.toFixed(2)} €
        </div>
        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
        >
          Passer la commande
        </button>
      </div>
    </div>
  );
};

export default Cart;