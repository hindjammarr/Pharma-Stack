// frontend/src/pages/ManageProducts.jsx
import React, { useEffect, useState } from "react";
import productService from "../services/productService";
import categoryService from "../services/categoryService";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    _id: null,
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch {
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
      // ignore
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Le nom est requis.";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      errs.price = "Le prix doit être un nombre positif.";
    if (!form.category) errs.category = "La catégorie est requise.";
    if (!form.stock || isNaN(form.stock) || Number(form.stock) < 0)
      errs.stock = "Le stock doit être un nombre positif ou nul.";
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormMessage("");
  };

  const handleEdit = (product) => {
    setForm({
      _id: product._id,
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category?._id || "",
      stock: product.stock || 0,
    });
    setFormErrors({});
    setFormMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await productService.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Erreur lors de la suppression du produit.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormLoading(true);
    setFormMessage("");
    try {
      if (form._id) {
        // update
        const updated = await productService.updateProduct(form._id, {
          name: form.name.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        setFormMessage("Produit mis à jour avec succès.");
      } else {
        // create
        const created = await productService.createProduct({
          name: form.name.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
        });
        setProducts((prev) => [created, ...prev]);
        setFormMessage("Produit créé avec succès.");
      }
      setForm({
        _id: null,
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
      setFormErrors({});
    } catch {
      setFormMessage("Erreur lors de la sauvegarde du produit.");
    } finally {
      setFormLoading(false);
      // frontend/src/pages/ManageProducts.jsx (continued)
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Gestion des Produits</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded shadow-md"
        noValidate
      >
        <h2 className="text-xl font-semibold mb-4">
          {form._id ? "Modifier un produit" : "Ajouter un produit"}
        </h2>

        {formMessage && (
          <p
            className={`mb-4 font-medium ${
              formMessage.includes("succès") ? "text-green-600" : "text-red-600"
            }`}
          >
            {formMessage}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={form.name}
            onChange={handleChange}
            disabled={formLoading}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300 resize-none"
            value={form.description}
            onChange={handleChange}
            disabled={formLoading}
          />
        </div>

        <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block mb-1 font-medium">
              Prix (€)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                formErrors.price ? "border-red-500" : "border-gray-300"
              }`}
              value={form.price}
              onChange={handleChange}
              disabled={formLoading}
            />
            {formErrors.price && (
              <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block mb-1 font-medium">
              Catégorie
            </label>
            <select
              id="category"
              name="category"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                formErrors.category ? "border-red-500" : "border-gray-300"
              }`}
              value={form.category}
              onChange={handleChange}
              disabled={formLoading}
            >
              <option value="">-- Sélectionner --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formErrors.category && (
              <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="stock" className="block mb-1 font-medium">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                formErrors.stock ? "border-red-500" : "border-gray-300"
              }`}
              value={form.stock}
              onChange={handleChange}
              disabled={formLoading}
            />
            {formErrors.stock && (
              <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={formLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
          >
            {formLoading
              ? form._id
                ? "Mise à jour..."
                : "Création..."
              : form._id
              ? "Mettre à jour"
              : "Ajouter"}
          </button>
          {form._id && (
            <button
              type="button"
              onClick={() =>
                setForm({
                  _id: null,
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  stock: "",
                })
              }
              disabled={formLoading}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">Liste des produits</h2>
      {loading ? (
        <p>Chargement des produits...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix (€)
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category?.name || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;