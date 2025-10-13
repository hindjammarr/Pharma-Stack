// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import orderService from "../services/orderService";

// const Orders = () => {
//   const { user, token } = useContext(AuthContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     const fetchOrders = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await orderService.getUserOrders(token);
//         setOrders(data);
//       } catch {
//         setError("Erreur lors du chargement des commandes.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [user, token]);

//   if (!user) {
//     return (
//       <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md text-center">
//         <p>Vous devez être connecté pour voir vos commandes.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-semibold mb-6">Mes Commandes</h1>
//       {loading ? (
//         <p>Chargement des commandes...</p>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : orders.length === 0 ? (
//         <p>Vous n'avez aucune commande.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="border rounded p-4 shadow-sm bg-white"
//             >
//               <div className="flex justify-between mb-2">
//                 <div>
//                   <p className="font-semibold">Commande #{order._id}</p>
//                   <p className="text-sm text-gray-600">
//                     Date:{" "}
//                     {new Date(order.createdAt).toLocaleDateString("fr-FR", {
//                       day: "2-digit",
//                       month: "long",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//                 <div>
//                   <p
//                     className={`font-semibold ${
//                       order.status === "Livrée"
//                         ? "text-green-600"
//                         : order.status === "En cours"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     {order.status}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <ul className="list-disc list-inside text-gray-700">
//                   {order.items.map((item) => (
//                     <li key={item.product._id}>
//                       {item.product.name} x {item.quantity} -{" "}
//                       {(item.product.price * item.quantity).toFixed(2)} €
//                     </li>
//                   ))}
//                 </ul>
//                 <p className="mt-2 font-semibold">
//                   Total: {order.total.toFixed(2)} €
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;



import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import orderService from "../services/orderService";

const Orders = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

      console.log("🪪 Token envoyé au backend:", token); // 👈 mets-le ici

    const fetchOrders = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await orderService.getUserOrders(token);
        setOrders(data);
      } catch {
        setError("Erreur lors du chargement des commandes.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, token]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md text-center">
        <p>Vous devez être connecté pour voir vos commandes.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Mes Commandes</h1>

      {loading ? (
        <p>Chargement des commandes...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : orders.length === 0 ? (
        <p>Vous n'avez aucune commande.</p>
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
                    Date:{" "}
                    {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p
                    className={`font-semibold ${
                      order.status === "delivered"
                        ? "text-green-600"
                        : order.status === "shipped"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              <div>
                <ul className="list-disc list-inside text-gray-700">
                  {order.products.map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} x {item.quantity} —{" "}
                      {(item.price * item.quantity).toFixed(2)} €
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

export default Orders;
