import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/**
 * Usage:
 * <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
 */

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Chargement...</div>;
  if (!user) return <Navigate to="/connexion" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
