import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * Usage:
 * <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
 */

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!user) return <Navigate to="/connexion" replace />;
  return children;
}
