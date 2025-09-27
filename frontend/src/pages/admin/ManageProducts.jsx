import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal"; // crée un modal simple si tu veux
import { ProductCard } from "@/components/ProductCard";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // produit en édition

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gérer les produits</h1>

      <Button className="mb-4" onClick={() => setEditing({})}>
        Ajouter un produit
      </Button>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="border p-2 rounded">
              <h3 className="font-bold">{p.name}</h3>
              <p>Prix : {p.price} €</p>
              <p>Stock : {p.stock}</p>
              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => setEditing(p)}>Modifier</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <ProductForm
            product={editing}
            onSuccess={() => {
              setEditing(null);
              fetchProducts();
            }}
          />
        </Modal>
      )}
    </div>
  );
}

// Composant Formulaire (créer / modifier)
function ProductForm({ product, onSuccess }) {
  const [form, setForm] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || 0,
    stock: product.stock || 0,
    category: product.category || "",
    image: product.image || ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product._id) {
        await api.put(`/products/${product._id}`, form);
      } else {
        await api.post("/products", form);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4">
      <Input placeholder="Nom du produit" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <Input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      <Input type="number" placeholder="Prix" value={form.price} onChange={e => setForm({...form, price: parseFloat(e.target.value)})} />
      <Input type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({...form, stock: parseInt(e.target.value)})} />
      <Input placeholder="Catégorie" value={form.category} onChange={e => setForm({...form, category: e.target.value})} />
      <Input placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
      <Button type="submit" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</Button>
    </form>
  );
}
