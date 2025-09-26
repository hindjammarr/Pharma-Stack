import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/Header";
import Accueil from "@/pages/Accueil";
import Produits from "@/pages/Produits";
import Contact from "@/pages/Contact";
import { LoginForm } from "@/components/LoginForm";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Accueil} />
      <Route path="/produits" component={Produits} />
      <Route path="/contact" component={Contact} />
      <Route path="/connexion">
        <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
          <LoginForm 
            onLogin={async (email, password, rememberMe) => {
              console.log('Login:', { email, password, rememberMe });
              // todo: remove mock functionality - implement real authentication
            }}
          />
        </div>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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

export default App;