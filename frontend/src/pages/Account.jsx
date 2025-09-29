// frontend/src/pages/Account.jsx (continued)
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import userService from "../services/userService";

const Account = () => {
  const { user, token, setUser  } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Le nom est requis.";
    if (!formData.email.trim()) {
      errs.email = "L'email est requis.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errs.email = "Email invalide.";
    }
    if (formData.newPassword || formData.confirmNewPassword) {
      if (formData.newPassword.length < 6) {
        errs.newPassword = "Le nouveau mot de passe doit contenir au moins 6 caractères.";
      }
      if (formData.newPassword !== formData.confirmNewPassword) {
        errs.confirmNewPassword = "Les nouveaux mots de passe ne correspondent pas.";
      }
      if (!formData.currentPassword) {
        errs.currentPassword = "Le mot de passe actuel est requis pour changer le mot de passe.";
      }
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }
      const updatedUser  = await userService.updateProfile(updateData, token);
      setUser (updatedUser );
      setSuccessMsg("Profil mis à jour avec succès.");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }));
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Erreur lors de la mise à jour du profil."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md text-center">
        <p>Vous devez être connecté pour accéder à cette page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Mon Compte</h2>
      {successMsg && (
        <p className="mb-4 text-green-600 font-medium text-center">{successMsg}</p>
      )}
      {errorMsg && (
        <p className="mb-4 text-red-600 font-medium text-center">{errorMsg}</p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <hr className="my-6" />

        <h3 className="text-xl font-semibold mb-4">Changer le mot de passe</h3>

        <div className="mb-4">
          <label htmlFor="currentPassword" className="block mb-1 font-medium">
            Mot de passe actuel
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={loading}
            autoComplete="current-password"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-1 font-medium">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.newPassword ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.newPassword}
            onChange={handleChange}
            disabled={loading}
            autoComplete="new-password"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmNewPassword" className="block mb-1 font-medium">
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.confirmNewPassword ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.confirmNewPassword}
            onChange={handleChange}
            disabled={loading}
            autoComplete="new-password"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50"
        >
          {loading ? "Mise à jour..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default Account;