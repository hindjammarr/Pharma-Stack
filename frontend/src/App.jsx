// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "@/lib/theme";
// import { Header } from "@/components/Header";
// import Accueil from "@/pages/Accueil";
// import Produits from "@/pages/Produits";
// import Contact from "@/pages/Contact";
// import { LoginForm } from "@/components/LoginForm";
// import NotFound from "@/pages/not-found";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Accueil} />
//       <Route path="/produits" component={Produits} />
//       <Route path="/contact" component={Contact} />
//       <Route path="/connexion">
//         <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
//           <LoginForm 
//             onLogin={async (email, password, rememberMe) => {
//               console.log('Login:', { email, password, rememberMe });
//               // todo: remove mock functionality - implement real authentication
//             }}
//           />
//         </div>
//       </Route>
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


import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/Header";

// Pages publiques
import Accueil from "@/pages/Accueil";
import Produits from "@/pages/Produits";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/not-found";

// Pages client
import Account from "@/pages/Account";
import Orders from "@/pages/Orders";
import Cart from "@/pages/Cart";

// Pages admin
import Dashboard from "@/pages/admin/Dashboard";
import ManageProducts from "@/pages/admin/ManageProducts";
import ManageCategories from "@/pages/admin/ManageCategories";
import ManageUsers from "@/pages/admin/ManageUsers";
import ManageOrders from "@/pages/admin/ManageOrders";
import Settings from "@/pages/admin/Settings";

function Router() {
  return (
    <Switch>
      {/* Pages publiques */}
      <Route path="/" component={Accueil} />
      <Route path="/produits" component={Produits} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/connexion" component={Login} />
      <Route path="/inscription" component={Signup} />

      {/* Pages client */}
      <Route path="/compte" component={Account} />
      <Route path="/commandes" component={Orders} />
      <Route path="/panier" component={Cart} />

      {/* Pages admin */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/produits" component={ManageProducts} />
      <Route path="/admin/categories" component={ManageCategories} />
      <Route path="/admin/utilisateurs" component={ManageUsers} />
      <Route path="/admin/commandes" component={ManageOrders} />
      <Route path="/admin/settings" component={Settings} />

      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main>
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
