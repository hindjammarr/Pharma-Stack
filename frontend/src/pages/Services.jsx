import React from "react";

export default function Services() {
  const servicesList = [
    {
      id: 1,
      title: "Consultation Pharmaceutique",
      description: "Nos pharmaciens vous conseillent sur vos traitements et médicaments.",
    },
    {
      id: 2,
      title: "Livraison à Domicile",
      description: "Commandez vos médicaments en ligne et recevez-les directement chez vous.",
    },
    {
      id: 3,
      title: "Vaccinations",
      description: "Nous proposons des services de vaccination pour toute la famille.",
    },
    {
      id: 4,
      title: "Analyse de Médicaments",
      description: "Vérifiez vos médicaments et posologie avec notre équipe experte.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Nos Services</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-card rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


