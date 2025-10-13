import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";
import { useAuth } from "../context/AuthContext";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(null);

  const { user } = useAuth();

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const data = await orderService.getAllOrders(token);
      setOrders(data);
    } catch {
      setError("Erreur lors du chargement des commandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setStatusUpdating(orderId);
    try {
      const token = localStorage.getItem("token");
      const updatedOrder = await orderService.updateOrderStatus(
        orderId,
        newStatus,
        token
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    } catch {
      alert("Erreur lors de la mise à jour du statut.");
    } finally {
      setStatusUpdating(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Gestion des Commandes</h1>
      {loading ? (
        <p>Chargement des commandes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">Commande #{order._id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {/* Client: {order.user?.name || "Inconnu"} */}
                    Client: {order.userId?.name || "Inconnu"}

                  </p>
                </div>
                <div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    disabled={statusUpdating === order._id}
                    className="border rounded px-3 py-1"
                  >
                    <option value="En cours">En cours</option>
                    <option value="Livrée">Livrée</option>
                    <option value="Annulée">Annulée</option>
                  </select>
                </div>
              </div>
              <div>
                <ul className="list-disc list-inside text-gray-700">
                  {(order.items || []).map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} x {item.quantity} -{" "}
                      {(item.product.price * item.quantity).toFixed(2)} €
                    </li>
                  ))}
                </ul>

                <p className="mt-2 font-semibold">
                  Total: {order.total.toFixed(2)} €
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
