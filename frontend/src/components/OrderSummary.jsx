// frontend/src/components/OrderSummary.jsx
import React from "react";

const OrderSummary = ({ order }) => {
  if (!order) return null;

  return (
    <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Résumé de la commande</h2>
      <p className="mb-2">
        <strong>Commande n°:</strong> {order._id}
      </p>
      <p className="mb-4">
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <ul className="mb-4 list-disc list-inside space-y-1">
        {order.items.map((item) => (
          <li key={item.product._id}>
            {item.product.name} x {item.quantity} -{" "}
            {(item.product.price * item.quantity).toFixed(2)} €
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold">
        Total: {order.total.toFixed(2)} €
      </p>
      <p className="mt-4">
        <strong>Statut:</strong>{" "}
        <span
          className={`font-semibold ${
            order.status === "Livrée"
              ? "text-green-600"
              : order.status === "En cours"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {order.status}
        </span>
      </p>
    </div>
  );
};

export default OrderSummary;