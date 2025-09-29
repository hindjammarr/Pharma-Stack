// import React, { useState, useEffect } from "react";
// import api from "@/services/api";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Ici tu peux adapter selon ton backend (route /cart ou panier lié à l'utilisateur)
//   const fetchCart = async () => {
//     try {
//       const { data } = await api.get("/cart");
//       setCartItems(data);
//     } catch (err) {
//       console.error("Erreur lors du chargement du panier :", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (loading) return <div className="p-4">Chargement du panier...</div>;
//   if (!cartItems.length) return <div className="p-4">Votre panier est vide.</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Mon panier</h1>
//       <ul>
//         {cartItems.map(item => (
//           <li key={item._id} className="border p-2 mb-2 rounded">
//             {item.productName} - Quantité : {item.quantity} - Prix : {item.price} €
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import api from "@/services/api";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart"); // adapte selon ton backend
      // Assure-toi que data est un tableau
      setCartItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur lors du chargement du panier :", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div className="p-4">Chargement du panier...</div>;
  if (!cartItems.length) return <div className="p-4">Votre panier est vide.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mon panier</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={item._id || index} className="border p-2 mb-2 rounded">
            Produit: {item.product?.name || item.productName} <br />
            Quantité: {item.quantity} <br />
            Prix: {item.price} €
          </li>
        ))}
      </ul>
    </div>
  );
}
