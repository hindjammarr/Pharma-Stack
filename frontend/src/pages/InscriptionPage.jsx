// import { InscriptionForm } from "@/components/InscriptionForm";

// export default function InscriptionPage() {
//   const handleRegister = async (name, email, password) => {
//     const response = await fetch("http://localhost:5000/api/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     if (!response.ok) {
//       const data = await response.json();
//       throw new Error(data.message || "Erreur d'inscription");
//     }

//     return await response.json();
//   };

//   return <InscriptionForm onRegister={handleRegister} />;
// }


import { InscriptionForm } from "@/components/InscriptionForm";
import { useLocation } from "wouter";
import { useState } from "react";

export default function InscriptionPage() {
  const [, setLocation] = useLocation(); // pour rediriger
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (name, email, password) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur d'inscription");
      }

      // ✅ Redirection après succès
      setLocation("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InscriptionForm
      onRegister={handleRegister}
      isLoading={isLoading}
      error={error}
    />
  );
}
