// // frontend/src/components/DashboardSidebar.jsx
// import React from "react";
// import { NavLink } from "react-router-dom";

// const DashboardSidebar = () => {
//   const links = [
//     { to: "/dashboard", label: "Tableau de bord" },
//     { to: "/dashboard/manage-products", label: "Produits" },
//     { to: "/dashboard/manage-categories", label: "Catégories" },
//     { to: "/dashboard/manage-users", label: "Utilisateurs" },
//     { to: "/dashboard/manage-orders", label: "Commandes" },
//     { to: "/dashboard/settings", label: "Paramètres" },
//   ];

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
//       <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
//       <nav className="flex flex-col space-y-2">
//         {links.map(({ to, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded font-medium ${
//                 isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
//               }`
//             }
//             end
//           >
//             {label}
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// export default DashboardSidebar;


import React from "react";
import { NavLink } from "react-router-dom";
import {
  Cog6ToothIcon,
  ShoppingBagIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";


const links = [
  { to: "manage-products", label: "Produits", icon: ShoppingBagIcon },
  { to: "manage-categories", label: "Catégories", icon: Squares2X2Icon },
  { to: "manage-users", label: "Utilisateurs", icon: UsersIcon },
  { to: "manage-orders", label: "Commandes", icon: ClipboardDocumentListIcon },
  { to: "settings", label: "Paramètres", icon: Cog6ToothIcon },
];


const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r shadow-sm hidden md:block">
      <div className="p-6 font-bold text-teal-700 text-xl">Admin Panel</div>
      <nav className="space-y-2 px-4">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={`/dashboard/${to}`}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-teal-100 text-teal-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
