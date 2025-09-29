// import { useState } from "react";
// import { ProductCard } from "@/components/ProductCard";
// import { CategoryFilter } from "@/components/CategoryFilter";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";

// export default function Produits() {
//   // todo: remove mock functionality
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortBy, setSortBy] = useState("name");
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilters, setShowFilters] = useState(false);

//   const allProducts = [
//     {
//       id: "1",
//       name: "Doliprane 1000mg",
//       description: "Paracétamol pour douleurs et fièvre. Boîte de 20 comprimés.",
//       price: 4.50,
//       stock: 25,
//       category: "Antalgiques",
//       categoryId: "1"
//     },
//     {
//       id: "2",
//       name: "Vitamine C 500mg", 
//       description: "Complément alimentaire. Boîte de 30 comprimés effervescents.",
//       price: 8.90,
//       stock: 15,
//       category: "Vitamines",
//       categoryId: "2"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="bg-muted/30 py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Produits</h1>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Découvrez notre large gamme de médicaments et produits de santé
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {allProducts.map((product) => (
//             <ProductCard
//               key={product.id}
//               id={product.id}
//               name={product.name}
//               description={product.description}
//               price={product.price}
//               stock={product.stock}
//               category={product.category}
//               onAddToCart={(id) => console.log(`Added product ${id} to cart`)}
//               onViewDetails={(id) => console.log(`Viewing product ${id}`)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// frontend/src/pages/Produits.jsx
import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";

const Produits = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async (categoryId = null) => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (categoryId) {
        data = await productService.getByCategory(categoryId);
      } else {
        data = await productService.getAll();
      }
      setProducts(data);
    } catch (err) {
      setError("Erreur lors du chargement des produits.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch {
      // silently fail categories
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Nos Produits</h1>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {loading ? (
        <p className="text-center mt-8">Chargement des produits...</p>
      ) : error ? (
        <p className="text-center mt-8 text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center mt-8">Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Produits;