


import { ArrowRight, Shield, Clock, Truck, Phone } from "lucide-react";
// import { Link } from "wouter";
import { Link } from "react-router-dom";

import heroImage from "../assets/generated_images/pharma.png";

export default function HeroSection() {
  const features = [
    { icon: Shield, title: "Sécurisé", description: "Médicaments certifiés" },
    { icon: Clock, title: "Ouvert 7j/7", description: "Service continu" },
    { icon: Truck, title: "Livraison rapide", description: "24h chrono" },
    { icon: Phone, title: "Conseil expert", description: "Pharmaciens diplômés" }
  ];

  return (
    <section className="relative min-h-[600px] bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded mb-4">
                ✨ Nouvelle pharmacie en ligne
              </span>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Votre santé, <span className="text-teal-600">notre priorité</span>
              </h1>

              <p className="text-xl text-gray-700 max-w-xl">
                Découvrez PharmaCare, votre pharmacie de confiance. 
                Commandez vos médicaments en ligne et bénéficiez de conseils personnalisés 
                de nos pharmaciens experts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/produits"
                className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-lg font-medium px-8 py-3 rounded transition"
              >
                Découvrir nos produits
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-teal-600 text-teal-600 text-lg font-medium px-8 py-3 rounded transition hover:bg-teal-50"
              >
                Contacter un pharmacien
              </Link>
            </div>

            <div className="pt-8">
              <p className="text-sm text-gray-600 mb-2">
                ✅ Plus de 5000 médicaments disponibles
              </p>
              <p className="text-sm text-gray-600">
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

              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{feature.title}</p>
                          <p className="text-xs text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-transparent rounded-2xl" />
          </div>
        </div>
      </div>

      <div className="bg-teal-600 text-white py-4">
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
