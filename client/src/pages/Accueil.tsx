import { HeroSection } from "@/components/HeroSection";
import { ProductCard } from "@/components/ProductCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight, Shield, Truck, Clock, HeartHandshake } from "lucide-react";
import { Link } from "wouter";
import productsImage from "@assets/generated_images/Pharmacy_products_collection_8e9a162e.png";
import pharmacistFemale from "@assets/generated_images/Female_pharmacist_portrait_d617a05c.png";
import pharmacistMale from "@assets/generated_images/Male_pharmacist_portrait_eaf79249.png";

export default function Accueil() {
  // todo: remove mock functionality
  const featuredProducts = [
    {
      id: "1",
      name: "Doliprane 1000mg",
      description: "Paracétamol pour douleurs et fièvre. Boîte de 20 comprimés.",
      price: 4.50,
      stock: 25,
      category: "Antalgique"
    },
    {
      id: "2",
      name: "Vitamine C 500mg",
      description: "Complément alimentaire. Boîte de 30 comprimés effervescents.",
      price: 8.90,
      stock: 15,
      category: "Vitamines"
    },
    {
      id: "3",
      name: "Sirop Toux Sèche",
      description: "Sirop pour calmer la toux sèche. Flacon 125ml.",
      price: 12.50,
      stock: 8,
      category: "Respiratoire"
    },
    {
      id: "4",
      name: "Crème Hydratante",
      description: "Crème hydratante pour peaux sensibles. Tube 50ml.",
      price: 15.90,
      stock: 30,
      category: "Cosmétique"
    }
  ];
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Produits phares
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos produits les plus populaires
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez notre sélection de médicaments et produits de santé les plus demandés
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
                onViewDetails={(id) => console.log(`Viewing product ${id}`)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/produits">
                Voir tous nos produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}