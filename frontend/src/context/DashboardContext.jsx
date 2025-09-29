// frontend/src/context/DashboardContext.jsx
import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <DashboardContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </DashboardContext.Provider>
  );
};