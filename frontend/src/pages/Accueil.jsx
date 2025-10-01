// nv

import  HeroSection  from "../components/HeroSection";
import  ProductCard  from "../components/ProductCard";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Accueil() {
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

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded mb-4">
              Produits phares
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos produits les plus populaires
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Découvrez notre sélection de médicaments et produits de santé les plus demandés
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              // <ProductCard
              //   key={product.id}
              //   id={product.id}
              //   name={product.name}
              //   description={product.description}
              //   price={product.price}
              //   stock={product.stock}
              //   category={product.category}
              //   onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
              //   onViewDetails={(id) => console.log(`Viewing product ${id}`)}
              // />
              <ProductCard
  key={product.id}
  product={product}
  onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
  onViewDetails={(id) => console.log(`Viewing product ${id}`)}
/>

            ))}
          </div>

          <div className="text-center">
            <Link
              href="/produits"
              className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium px-8 py-3 rounded transition"
            >
              Voir tous nos produits
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


