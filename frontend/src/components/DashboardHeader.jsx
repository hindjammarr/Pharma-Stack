// frontend/src/components/DashboardHeader.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4">
      <h1 className="text-xl font-semibold">Bienvenue, {user?.name}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
      >
        Déconnexion
      </button>
    </header>
  );
};

export default DashboardHeader;