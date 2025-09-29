// import { HeroSection } from "@/components/HeroSection";
// import { ProductCard } from "@/components/ProductCard";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Star, ArrowRight, Shield, Truck, Clock, HeartHandshake } from "lucide-react";
// import { Link } from "wouter";
// // import productsImage from "../assets/generated_images/produits.png";
// // import pharmacistFemale from "../assets/women.png";
// // import pharmacistMale from "../assets/generated_images/pharportrait.png";

// export default function Accueil() {
//   // Mock data
//   const featuredProducts = [
//     {
//       id: "1",
//       name: "Doliprane 1000mg",
//       description: "Paracétamol pour douleurs et fièvre. Boîte de 20 comprimés.",
//       price: 4.50,
//       stock: 25,
//       category: "Antalgique"
//     },
//     {
//       id: "2",
//       name: "Vitamine C 500mg",
//       description: "Complément alimentaire. Boîte de 30 comprimés effervescents.",
//       price: 8.90,
//       stock: 15,
//       category: "Vitamines"
//     },
//     {
//       id: "3",
//       name: "Sirop Toux Sèche",
//       description: "Sirop pour calmer la toux sèche. Flacon 125ml.",
//       price: 12.50,
//       stock: 8,
//       category: "Respiratoire"
//     },
//     {
//       id: "4",
//       name: "Crème Hydratante",
//       description: "Crème hydratante pour peaux sensibles. Tube 50ml.",
//       price: 15.90,
//       stock: 30,
//       category: "Cosmétique"
//     }
//   ];

//   return (
//     <div className="min-h-screen">
//       <HeroSection />

//       <section className="py-16 bg-muted/30">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <Badge variant="secondary" className="mb-4">
//               Produits phares
//             </Badge>
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Nos produits les plus populaires
//             </h2>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Découvrez notre sélection de médicaments et produits de santé les plus demandés
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             {featuredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 id={product.id}
//                 name={product.name}
//                 description={product.description}
//                 price={product.price}
//                 stock={product.stock}
//                 category={product.category}
//                 onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
//                 onViewDetails={(id) => console.log(`Viewing product ${id}`)}
//               />
//             ))}
//           </div>

//           <div className="text-center">
//             <Button size="lg" asChild>
//               <Link href="/produits">
//                 Voir tous nos produits
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import React from 'react'
import { Link } from 'react-router-dom'

const Accueil = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenue à PharmaPlus
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Votre santé, notre priorité
            </p>
            <Link
              to="/produits"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg text-lg font-semibold hover:bg-secondary/90 transition duration-300"
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Services</h2>
            <p className="text-muted-foreground text-lg">
              Des services complets pour votre bien-être
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="text-xl font-semibold mb-3">Médicaments</h3>
              <p className="text-muted-foreground">
                Large gamme de médicaments prescrits et en vente libre
              </p>
            </div>
            
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-3">Conseils Santé</h3>
              <p className="text-muted-foreground">
                Conseils professionnels pour vos questions de santé
              </p>
            </div>
            
            <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-3">Livraison à Domicile</h3>
              <p className="text-muted-foreground">
                Service de livraison rapide et sécurisée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy Info */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Informations Pharmacie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Horaires d'ouverture</h3>
                <p className="text-muted-foreground">
                  Lundi - Vendredi: 8h00 - 19h00<br/>
                  Samedi: 8h00 - 12h00<br/>
                  Dimanche: Fermé
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <p className="text-muted-foreground">
                  📞 01 23 45 67 89<br/>
                  📧 contact@pharmaplus.fr<br/>
                  📍 123 Rue de la Santé, 75000 Paris
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Accueil