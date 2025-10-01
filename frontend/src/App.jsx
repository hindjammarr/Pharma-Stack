// // import { Switch, Route } from "wouter";
// // import { queryClient } from "./lib/queryClient";
// // import { QueryClientProvider } from "@tanstack/react-query";
// // import { Toaster } from "@/components/ui/toaster";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { ThemeProvider } from "@/lib/theme";
// // import { Header } from "@/components/Header";
// // import Accueil from "@/pages/Accueil";
// // import Produits from "@/pages/Produits";
// // import Contact from "@/pages/Contact";
// // import { LoginForm } from "@/components/LoginForm";
// // import NotFound from "@/pages/not-found";

// // function Router() {
// //   return (
// //     <Switch>
// //       <Route path="/" component={Accueil} />
// //       <Route path="/produits" component={Produits} />
// //       <Route path="/contact" component={Contact} />
// //       <Route path="/connexion">
// //         <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
// //           <LoginForm 
// //             onLogin={async (email, password, rememberMe) => {
// //               console.log('Login:', { email, password, rememberMe });
// //               // todo: remove mock functionality - implement real authentication
// //             }}
// //           />
// //         </div>
// //       </Route>
// //       <Route component={NotFound} />
// //     </Switch>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <ThemeProvider>
// //         <TooltipProvider>
// //           <div className="min-h-screen bg-background">
// //             <Header />
// //             <main>
// //               <Router />
// //             </main>
// //           </div>
// //           <Toaster />
// //         </TooltipProvider>
// //       </ThemeProvider>
// //     </QueryClientProvider>
// //   );
// // }


// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "@/lib/theme";
// import { Header } from "@/components/Header";
// import InscriptionPage from "./pages/InscriptionPage";

// // Pages publiques
// import Accueil from "@/pages/Accueil";
// import Produits from "@/pages/Produits";
// import Contact from "@/pages/Contact";
// import Services from "@/pages/Services";
// // import Login from "@/pages/Login";
// // import Signup from "@/pages/Signup";
// import NotFound from "@/pages/not-found";

// // Pages client
// // import Account from "@/pages/Account";
//  import Orders from "@/pages/Orders";
// import Cart from "@/pages/Cart";

// // Pages admin
// import Dashboard from "@/pages/admin/Dashboard";
// import ManageProducts from "@/pages/admin/ManageProducts";
// import ManageCategories from "@/pages/admin/ManageCategories";
// import ManageUsers from "@/pages/admin/ManageUsers";
// import ManageOrders from "@/pages/admin/ManageOrders";
// import Settings from "@/pages/admin/Settings";
// import LoginPage from "./pages/LoginPage";

// function Router() {
//   return (
//     <Switch>
//       {/* Pages publiques */}
//       <Route path="/" component={Accueil} />
//       <Route path="/produits" component={Produits} />
//       <Route path="/services" component={Services} />
//       <Route path="/contact" component={Contact} />
//        <Route path="/login" component={LoginPage} />
      
//         <Route path="/inscription" component={InscriptionPage} />
//       {/* Pages client */}
//       {/* <Route path="/compte" component={Account} /> */}
//       <Route path="/commandes" component={Orders} />
//       <Route path="/panier" component={Cart} />

//       {/* Pages admin */}
//       <Route path="/admin" component={Dashboard} />
//       <Route path="/admin/produits" component={ManageProducts} />
//       <Route path="/admin/categories" component={ManageCategories} />
//       <Route path="/admin/utilisateurs" component={ManageUsers} />
//       <Route path="/admin/commandes" component={ManageOrders} />
//       <Route path="/admin/settings" component={Settings} />

//       {/* 404 */}
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider>
//         <TooltipProvider>
//           <div className="min-h-screen bg-background">
//             <Header />
//             <main>
//               <Router />
//             </main>
//           </div>
//           <Toaster />
//         </TooltipProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }


import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Produits from './pages/Produits'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Account from './pages/Account'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import Dashboard from './pages/Dashboard'
import ManageProducts from './pages/ManageProducts'
import ManageCategories from './pages/ManageCategories'
import ManageUsers from './pages/ManageUsers'
import ManageOrders from './pages/ManageOrders'
import Settings from './pages/Settings'

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
              
              {/* Admin Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/manage-products" element={<ManageProducts />} />
              <Route path="/manage-categories" element={<ManageCategories />} />
              <Route path="/manage-users" element={<ManageUsers />} />
              <Route path="/manage-orders" element={<ManageOrders />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  )
}

export default App