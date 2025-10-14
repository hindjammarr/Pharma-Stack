
// // frontend/src/pages/Produits.jsx
// import React, { useEffect, useState } from "react";
// import productService from "../services/productService";
// import categoryService from "../services/categoryService";
// import ProductCard from "../components/ProductCard";
// import CategoryFilter from "../components/CategoryFilter";

// const Produits = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchProducts = async (categoryId = null) => {
//     setLoading(true);
//     setError("");
//     try {
//       let data;
//       if (categoryId) {
//         data = await productService.getByCategory(categoryId);
//       } else {
//         data = await productService.getAll();
//       }
//       setProducts(data);
//     } catch (err) {
//       setError("Erreur lors du chargement des produits.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const data = await categoryService.getAll();
//       setCategories(data);
//     } catch {
//       // silently fail categories
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // useEffect(() => {
//   //   fetchProducts(selectedCategory);
//   // }, [selectedCategory]);
//   useEffect(() => {
//   fetchProducts(selectedCategory ? selectedCategory._id : null);
// }, [selectedCategory]);


//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-semibold mb-6">Nos Produits</h1>
//       <CategoryFilter
//         categories={categories}
//         selectedCategory={selectedCategory}
//         onSelectCategory={setSelectedCategory}
//       />
//       {loading ? (
//         <p className="text-center mt-8">Chargement des produits...</p>
//       ) : error ? (
//         <p className="text-center mt-8 text-red-600">{error}</p>
//       ) : products.length === 0 ? (
//         <p className="text-center mt-8">Aucun produit trouvé.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Produits;





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

  // const fetchProducts = async (categoryId = null) => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     let data;
  //     if (categoryId) {
  //       data = await productService.getByCategory(categoryId);
  //     } else {
  //       data = await productService.getAll();
  //     }
  //     setProducts(data);
  //   } catch (err) {
  //     setError("Erreur lors du chargement des produits.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
//   useEffect(() => {
//   fetchProducts(selectedCategory ? selectedCategory._id : null);
// }, [selectedCategory]);


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