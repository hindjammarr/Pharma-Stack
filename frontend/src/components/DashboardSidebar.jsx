// frontend/src/components/DashboardSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const links = [
    { to: "/dashboard", label: "Tableau de bord" },
    { to: "/dashboard/manage-products", label: "Produits" },
    { to: "/dashboard/manage-categories", label: "Catégories" },
    { to: "/dashboard/manage-users", label: "Utilisateurs" },
    { to: "/dashboard/manage-orders", label: "Commandes" },
    { to: "/dashboard/settings", label: "Paramètres" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded font-medium ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`
            }
            end
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;