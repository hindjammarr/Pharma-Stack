// frontend/src/pages/Settings.jsx
import React, { useEffect, useState } from "react";
import pharmacyService from "../services/pharmacyService";

const Settings = () => {
  // const [pharmacyInfo, setPharmacyInfo] = useState({
  //   name: "",
  //   address: "",
  //   phone: "",
  //   email: "",
  //   openingHours: "",
  // });
  const [pharmacyInfo, setPharmacyInfo] = useState({
  // nom: "",
  adresse: "",
  telephone: "",
  email: "",
  horaires: "",
  pharmacieDeGarde: false,
});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchPharmacyInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await pharmacyService.getInfo();
      setPharmacyInfo({
        // nom: data.nom || "",
        adresse: data.adresse || "",
        telephone: data.telephone || "",
        email: data.email || "",
        horaires: data.horaires || "",
        // pharmacieDeGarde: data.pharmacieDeGarde || false,
          pharmacieDeGarde: data.pharmacieDeGarde ?? false,
      });
    } catch {
      setError("Erreur lors du chargement des informations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacyInfo();
  }, []);

  const handleChange = (e) => {
    setPharmacyInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      await pharmacyService.updateInfo(pharmacyInfo);
      setSuccessMsg("Informations mises à jour avec succès.");
      // ✅ Réinitialiser le formulaire
    setPharmacyInfo({
      horaires: "",
      adresse: "",
      telephone: "",
      pharmacieDeGarde: false,
    });
    } catch {
      setError("Erreur lors de la mise à jour des informations.");
    } finally {
      setSaving(false);
    }
  };

  return (
   

    <div className="max-w-3xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-semibold mb-6">Paramètres de la Pharmacie</h1>
      <p className="text-lg font-semibold mb-4">
      Pharmacie de garde :{" "}
      {pharmacyInfo.pharmacieDeGarde ? (
        <span className="text-green-600">Oui</span>
      ) : (
        <span className="text-red-600">Non</span>
      )}
    </p>
      {loading ? (
        <p>Chargement des informations...</p>

      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md" noValidate>
          {error && <p className="mb-4 text-red-600 font-medium">{error}</p>}
          {successMsg && <p className="mb-4 text-green-600 font-medium">{successMsg}</p>}

          <div className="mb-4">
            <label htmlFor="address" className="block mb-1 font-medium">
              Adresse
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
              value={pharmacyInfo.adresse}
              onChange={handleChange}
              disabled={saving}
            />
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block mb-1 font-medium">
                Téléphone
              </label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
                value={pharmacyInfo.telephone}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
                value={pharmacyInfo.email}
                onChange={handleChange}
                disabled={saving}
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="openingHours" className="block mb-1 font-medium">
              Horaires d'ouverture
            </label>
            <textarea
              id="horaires"
              name="horaires"
              rows="3"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring resize-none border-gray-300"
              value={pharmacyInfo.horaires}
              onChange={handleChange}
              disabled={saving}
            />
          </div>
     <div className="mb-6">
  <label htmlFor="pharmacieDeGarde" className="block mb-1 font-medium">
    Pharmacie de garde
  </label>
  <select
    id="pharmacieDeGarde"
    name="pharmacieDeGarde"
    value={pharmacyInfo.pharmacieDeGarde ? "true" : "false"}
    onChange={(e) =>
      setPharmacyInfo((prev) => ({
        ...prev,
        pharmacieDeGarde: e.target.value === "true",
      }))
    }
    disabled={saving}
    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
  >
    <option value="false">Non</option>
    <option value="true">Oui</option>
  </select>
</div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
          >
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;