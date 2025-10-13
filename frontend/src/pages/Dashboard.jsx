// // frontend/src/pages/Dashboard.jsx
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import DashboardSidebar from "../components/DashboardSidebar";
// import DashboardHeader from "../components/DashboardHeader";
// import { Outlet, Navigate } from "react-router-dom";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);

//   if (!user || user.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <DashboardSidebar />
//       <div className="flex-1 flex flex-col">
//         <DashboardHeader />
//         <main className="p-6 flex-1 overflow-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
