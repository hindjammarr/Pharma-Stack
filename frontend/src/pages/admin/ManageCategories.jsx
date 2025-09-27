import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal"; // Crée un modal simple si tu veux

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // catégorie en édition

  // Charger les catégories
  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  // Supprimer une catégorie
  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gérer les catégories</h1>

      <Button className="mb-4" onClick={() => setEditing({})}>
        Ajouter une catégorie
      </Button>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat._id} className="border p-2 rounded">
              <h3 className="font-bold">{cat.name}</h3>
              <p>Slug : {cat.slug}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => setEditing(cat)}>Modifier</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cat._id)}>Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <CategoryForm
            category={editing}
            onSuccess={() => {
              setEditing(null);
              fetchCategories();
            }}
          />
        </Modal>
      )}
    </div>
  );
}

// Formulaire catégorie (Ajouter / Modifier)
function CategoryForm({ category, onSuccess }) {
  const [form, setForm] = useState({
    name: category.name || "",
    slug: category.slug || ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (category._id) {
        await api.put(`/categories/${category._id}`, form);
      } else {
        await api.post("/categories", form);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4">
      <Input
        placeholder="Nom de la catégorie"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <Input
        placeholder="Slug"
        value={form.slug}
        onChange={e => setForm({ ...form, slug: e.target.value })}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </form>
  );
}
