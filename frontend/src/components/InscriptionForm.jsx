import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link, useLocation } from "wouter";
import { Mail, Lock, User, AlertCircle } from "lucide-react";

export function InscriptionForm({ onRegister, isLoading, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [_, setLocation] = useLocation();

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Le nom est requis";
    if (!email) errors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Format d'email invalide";
    if (!password) errors.password = "Le mot de passe est requis";
    else if (password.length < 6) errors.password = "Minimum 6 caractères";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onRegister(name, email, password);
      setLocation("/login"); // redirection après inscription
    } catch (err) {
      console.error("Inscription échouée:", err);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-2xl font-bold">Inscription</CardTitle>
        <CardDescription>Créez votre compte PharmaCare</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                className={`pl-10 ${formErrors.name ? "border-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@exemple.com"
                className={`pl-10 ${formErrors.email ? "border-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {formErrors.email && <p className="text-sm text-destructive">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`pl-10 ${formErrors.password ? "border-destructive" : ""}`}
                disabled={isLoading}
              />
            </div>
            {formErrors.password && <p className="text-sm text-destructive">{formErrors.password}</p>}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Création du compte..." : "Créer un compte"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Déjà inscrit ?{" "}
            <Link href="/login">
              <Button variant="link" className="p-0 h-auto text-sm">
                Se connecter
              </Button>
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
