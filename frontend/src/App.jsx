import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Produits from "./pages/Produits";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategories";
import ManageUsers from "./pages/ManageUsers";
import ManageOrders from "./pages/ManageOrders";
import Settings from "./pages/Settings";
import Checkout from "./pages/Checkout";
import Confirmation from "./components/Confirmation";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Accueil />} />
            <Route path="/produits" element={<Produits />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Client Routes */}
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders/checkout" element={<Checkout/>} />
             <Route path="/confirmation" element={<Confirmation />} />

            {/* Admin Routes */}
            
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<div>Bienvenue dans le dashboard</div>} />
              <Route path="manage-products" element={<ManageProducts />} />
              <Route path="manage-categories" element={<ManageCategories />} />
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-orders" element={<ManageOrders />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
