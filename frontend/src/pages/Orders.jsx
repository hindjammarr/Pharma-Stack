import React, { useEffect, useState } from "react";
import api from "@/services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger toutes les commandes depuis l'API
  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error("Erreur lors du chargement des commandes :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-4">Chargement des commandes...</div>;
  }

  if (!orders.length) {
    return <div className="p-4">Aucune commande trouvée.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mes commandes</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Client</th>
            <th className="border p-2">Total (€)</th>
            <th className="border p-2">Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.user?.name || "N/A"}</td>
              <td className="border p-2">{order.total.toFixed(2)}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
