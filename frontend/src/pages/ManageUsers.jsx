// frontend/src/pages/ManageUsers.jsx
import React, { useEffect, useState } from "react";
import userService from "../services/userService";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    _id: null,
    name: "",
    email: "",
    role: "user",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch {
      setError("Erreur lors du chargement des utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Le nom est requis.";
    if (!form.email.trim()) {
      errs.email = "L'email est requis.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      errs.email = "Email invalide.";
    }
    if (!["user", "admin"].includes(form.role)) {
      errs.role = "Rôle invalide.";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormMessage("");
  };

  const handleEdit = (user) => {
    setForm({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setFormErrors({});
    setFormMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    try {
      await userService.deleteUser (id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      alert("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormLoading(true);
    setFormMessage("");
    try {
      if (form._id) {
        const updated = await userService.updateUser (form._id, {
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role,
        });
        setUsers((prev) =>
          prev.map((u) => (u._id === updated._id ? updated : u))
        );
        setFormMessage("Utilisateur mis à jour avec succès.");
      } else {
        const created = await userService.createUser ({
          name: form.name.trim(),
          email: form.email.trim(),
          role: form.role,
        });
        setUsers((prev) => [created, ...prev]);
        setFormMessage("Utilisateur créé avec succès.");
      }
      setForm({
        _id: null,
        name: "",
        email: "",
        role: "user",
      });
    }
    // frontend/src/pages/ManageUsers.jsx (continued)
      setFormLoading(false);
    } catch {
      setFormMessage("Erreur lors de la sauvegarde de l'utilisateur.");
      setFormLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Gestion des Utilisateurs</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-6 rounded shadow-md"
        noValidate
      >
        <h2 className="text-xl font-semibold mb-4">
          {form._id ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
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
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={form.email}
            onChange={handleChange}
            disabled={formLoading}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="role" className="block mb-1 font-medium">
            Rôle
          </label>
          <select
            id="role"
            name="role"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              formErrors.role ? "border-red-500" : "border-gray-300"
            }`}
            value={form.role}
            onChange={handleChange}
            disabled={formLoading}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
          {formErrors.role && (
            <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>
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
              onClick={() =>
                setForm({
                  _id: null,
                  name: "",
                  email: "",
                  role: "user",
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

      <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
      {loading ? (
        <p>Chargement des utilisateurs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
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
}


export default ManageUsers;