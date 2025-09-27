import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Input, Textarea, Button } from "@/components/ui";

export default function Settings() {
  const [form, setForm] = useState({
    adresse: "",
    telephone: "",
    horaires: "",
    pharmacieDeGarde: false,
  });

  useEffect(() => {
    const fetchInfo = async () => {
      const { data } = await api.get("/pharmacy");
      setForm(data);
    };
    fetchInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/pharmacy", form);
      alert("Infos mises à jour !");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Paramètres de la pharmacie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Adresse" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} />
        <Input placeholder="Téléphone" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} />
        <Textarea placeholder="Horaires" value={form.horaires} onChange={e => setForm({...form, horaires: e.target.value})} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.pharmacieDeGarde} onChange={e => setForm({...form, pharmacieDeGarde: e.target.checked})} />
          Pharmacie de garde
        </label>
        <Button type="submit">Enregistrer</Button>
      </form>
    </div>
  );
}
