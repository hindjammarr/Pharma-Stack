import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Button, Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, status) => {
    await api.put(`/orders/${orderId}`, { status });
    fetchOrders();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gérer les commandes</h1>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>ID</th>
            <th>Client</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id} className="border-b">
              <td>{o._id}</td>
              <td>{o.user?.name}</td>
              <td>{o.total} €</td>
              <td>{o.status}</td>
              <td>
                <Select value={o.status} onValueChange={val => updateStatus(o._id, val)}>
                  <SelectTrigger><SelectValue placeholder={o.status} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmée</SelectItem>
                    <SelectItem value="shipped">Expédiée</SelectItem>
                    <SelectItem value="delivered">Livrée</SelectItem>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
