
import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";
import { ArrowRight, ShieldCheck, ShieldX } from "lucide-react";
import { Link } from "react-router-dom";
import pharmacyService from "../services/pharmacyService";

export default function Accueil() {
  const [pharmacyInfo, setPharmacyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchPharmacyInfo = async () => {
      try {
        const data = await pharmacyService.getInfo();
        setPharmacyInfo(data);
      } catch (error) {
        console.error("Erreur chargement pharmacie :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPharmacyInfo();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* ✅ Bloc pharmacie de garde */}
      <section className="bg-white py-6 border-b">
  <div className="container mx-auto px-4">   
     <div className="flex flex-col items-center justify-center text-center">            <h2 className="text-xl font-semibold text-gray-800">
              État de la pharmacie
            </h2>
            {loading ? (
              <p className="text-gray-500">Chargement...</p>
            ) : pharmacyInfo ? (
              <p className="text-lg mt-2">
                Pharmacie de garde :{" "}
                {pharmacyInfo.pharmacieDeGarde ? (
                  <span className="inline-flex items-center text-green-600 font-bold">
                    <ShieldCheck className="w-5 h-5 mr-1" />
                    Oui
                  </span>
                ) : (
                  <span className="inline-flex items-center text-red-600 font-bold">
                    <ShieldX className="w-5 h-5 mr-1" />
                    Non
                  </span>
                )}
              </p>
            ) : (
              <p className="text-red-500">Information indisponible</p>
            )}
          </div>
        </div>
      </section>

      {/* ✅ Section produits */}
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
              to="/produits"
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
