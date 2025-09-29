// import React, { useEffect, useState } from "react";
// import api from "@/services/api";
//  import { Input, Textarea, Button } from "@/components/ui";



// export default function Settings() {
//   const [form, setForm] = useState({
//     adresse: "",
//     telephone: "",
//     horaires: "",
//     pharmacieDeGarde: false,
//   });

//   useEffect(() => {
//     const fetchInfo = async () => {
//       const { data } = await api.get("/pharmacy");
//       setForm(data);
//     };
//     fetchInfo();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put("/pharmacy", form);
//       alert("Infos mises à jour !");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Paramètres de la pharmacie</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <Input placeholder="Adresse" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} />
//         <Input placeholder="Téléphone" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} />
//         <Textarea placeholder="Horaires" value={form.horaires} onChange={e => setForm({...form, horaires: e.target.value})} />
//         <label className="flex items-center gap-2">
//           <input type="checkbox" checked={form.pharmacieDeGarde} onChange={e => setForm({...form, pharmacieDeGarde: e.target.checked})} />
//           Pharmacie de garde
//         </label>
//         <Button type="submit">Enregistrer</Button>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "@/services/api";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du statut !");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gérer les commandes</h1>
      <table className="w-full border border-gray-200">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Client</th>
            <th className="p-2">Total</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-b">
              <td className="p-2">{o._id}</td>
              <td className="p-2">{o.user?.name}</td>
              <td className="p-2">{o.total} €</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">En attente</option>
                  <option value="confirmed">Confirmée</option>
                  <option value="shipped">Expédiée</option>
                  <option value="delivered">Livrée</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
