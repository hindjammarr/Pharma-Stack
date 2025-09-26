import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Clock, Truck, Phone } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Pharmacy_interior_hero_2e40cd21.png";

export function HeroSection() {
  const features = [
    {
      icon: Shield,
      title: "Sécurisé",
      description: "Médicaments certifiés"
    },
    {
      icon: Clock,
      title: "Ouvert 7j/7",
      description: "Service continu"
    },
    {
      icon: Truck,
      title: "Livraison rapide",
      description: "24h chrono"
    },
    {
      icon: Phone,
      title: "Conseil expert",
      description: "Pharmaciens diplômés"
    }
  ];
  
  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                ✨ Nouvelle pharmacie en ligne
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Votre santé,{" "}
                <span className="text-primary">notre priorité</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Découvrez PharmaCare, votre pharmacie de confiance. 
                Commandez vos médicaments en ligne et bénéficiez de conseils personnalisés 
                de nos pharmaciens experts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/produits">
                  Découvrir nos produits
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link href="/contact">
                  Contacter un pharmacien
                </Link>
              </Button>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">
                ✅ Plus de 5000 médicaments disponibles
              </p>
              <p className="text-sm text-muted-foreground">
                ✅ Livraison gratuite dès 49€ d'achat
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage}
                alt="Intérieur moderne de pharmacie"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              
              <Card className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{feature.title}</p>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
      
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="text-2xl">🚑</span>
            <div>
              <p className="font-medium">
                Urgence médicale ? Appelez le 15 • Pharmacie de garde : 01 98 76 54 32
              </p>
              <p className="text-sm opacity-90">
                Service d'urgence pharmaceutique disponible 24h/24
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}