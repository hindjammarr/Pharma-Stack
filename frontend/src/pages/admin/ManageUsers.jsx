import React, { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const { data } = await api.get("/users");
    setUsers(data);
  };
  useEffect(() => { fetchUsers(); }, []);

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "client" : "admin";
    await api.put(`/users/${user._id}`, { role: newRole });
    fetchUsers();
  };

  const deleteUser = async (user) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await api.delete(`/users/${user._id}`);
    fetchUsers();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gérer les utilisateurs</h1>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="flex gap-2 p-2">
                <Button size="sm" onClick={() => toggleRole(u)}>Changer rôle</Button>
                <Button size="sm" variant="destructive" onClick={() => deleteUser(u)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
