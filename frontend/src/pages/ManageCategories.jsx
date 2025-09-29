// frontend/src/pages/ManageCategories.jsx
import React, { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ _id: null, name: "" });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch {
      setError("Erreur lors du chargement des catégories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const validateForm = () => {
    if (!form.name.trim()) {
      setFormError("Le nom est requis.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormError("");
    setFormMessage("");
  };

  const handleEdit = (category) => {
    setForm({ _id: category._id, name: category.name });
    setFormError("");
    setFormMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;
    try {
      await categoryService.deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Erreur lors de la suppression de la catégorie.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormLoading(true);
    setFormMessage("");
    try {
      if (form._id) {
        const updated = await categoryService.updateCategory(form._id, {
          name: form.name.trim(),
        });
        setCategories((prev) =>
          prev.map((c) => (c._id === updated._id ? updated : c))
        );
        setFormMessage("Catégorie mise à jour avec succès.");
      } else {
        const created = await categoryService.createCategory({
          name: form.name.trim(),
        });
        setCategories((prev) => [created, ...prev]);
        setFormMessage("Catégorie créée avec succès.");
      }
      setForm({ _id: null, name: "" });
    } catch {
      setFormMessage("Erreur lors de la sauvegarde de la catégorie.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Gestion des Catégories</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded shadow-md"
        noValidate
      >
        <h2 className="text-xl font-semibold mb-4">
          {form._id ? "Modifier une catégorie" : "Ajouter une catégorie"}
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
              formError ? "border-red-500" : "border-gray-300"
            }`}
            value={form.name}
            onChange={handleChange}
            disabled={formLoading}
          />
          {formError && (
            <p className="text-red-500 text-sm mt-1">{formError}</p>
          )}
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
              onClick={() => setForm({ _id: null, name: "" })}
              disabled={formLoading}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">Liste des catégories</h2>
      {loading ? (
        <p>Chargement des catégories...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : categories.length === 0 ? (
        <p>Aucune catégorie trouvée.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
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

export default ManageCategories;