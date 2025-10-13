// src/pages/Confirmation.jsx
import React from "react";

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">✅ Paiement réussi !</h1>
      <p className="text-lg mb-6">Merci pour votre achat 🎉</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md">Retour à l’accueil</a>
    </div>
  );
};

export default Confirmation;
