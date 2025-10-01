


// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import authService from "../services/authService";

// const Signup = () => {
//   const navigate = useNavigate();
//   const { setUser, setToken } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const validate = () => {
//     const errs = {};
//     if (!formData.name.trim()) errs.name = "Le nom est requis.";
//     if (!formData.email.trim()) {
//       errs.email = "L'email est requis.";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
//     ) {
//       errs.email = "Email invalide.";
//     }
//     if (!formData.password) {
//       errs.password = "Le mot de passe est requis.";
//     } else if (formData.password.length < 6) {
//       errs.password = "Le mot de passe doit contenir au moins 6 caractères.";
//     }
//     if (formData.confirmPassword !== formData.password) {
//       errs.confirmPassword = "Les mots de passe ne correspondent pas.";
//     }
//     return errs;
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
//     setApiError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setLoading(true);
//     try {
//       const data = await authService.signup({
//         name: formData.name.trim(),
//         email: formData.email.trim(),
//         password: formData.password,
//       });
//       setUser(data.user);
//       setToken(data.token);
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } catch (error) {
//       setApiError(
//         error.response?.data?.message || "Erreur lors de l'inscription."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Créer un compte</h2>
//       {apiError && (
//         <div className="mb-4 text-red-600 font-medium text-center">{apiError}</div>
//       )}
//       <form onSubmit={handleSubmit} noValidate>
//         <div className="mb-4">
//           <label htmlFor="name" className="block mb-1 font-medium">
//             Nom complet
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
//               errors.name ? "border-red-500" : "border-gray-300"
//             }`}
//             value={formData.name}
//             onChange={handleChange}
//             disabled={loading}
//           />
//           {errors.name && (
//             <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="email" className="block mb-1 font-medium">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
//               errors.email ? "border-red-500" : "border-gray-300"
//             }`}
//             value={formData.email}
//             onChange={handleChange}
//             disabled={loading}
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block mb-1 font-medium">
//             Mot de passe
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
//               errors.password ? "border-red-500" : "border-gray-300"
//             }`}
//             value={formData.password}
//             onChange={handleChange}
//             disabled={loading}
//             autoComplete="new-password"
//           />
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//           )}
//         </div>

//         <div className="mb-6">
//           <label htmlFor="confirmPassword" className="block mb-1 font-medium">
//             Confirmer le mot de passe
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
//               errors.confirmPassword ? "border-red-500" : "border-gray-300"
//             }`}
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             disabled={loading}
//             autoComplete="new-password"
//           />
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50"
//         >
//           {loading ? "Inscription..." : "S'inscrire"}
//         </button>
//       </form>
//       <p className="mt-4 text-center text-gray-600">
//         Vous avez déjà un compte ?{" "}
//         <Link to="/login" className="text-blue-600 hover:underline">
//           Se connecter
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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
    if (!formData.password) {
      errs.password = "Le mot de passe est requis.";
    } else if (formData.password.length < 6) {
      errs.password = "Minimum 6 caractères.";
    }
    if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = "Les mots de passe ne correspondent pas.";
    }
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const data = await authService.signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Erreur lors de l'inscription."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg border border-gray-100 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
        Créer un compte
      </h2>

      {apiError && (
        <div className="mb-4 text-red-600 font-medium text-center animate-shake">
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {["name", "email", "password", "confirmPassword"].map((field) => (
          <div key={field}>
            <label
              htmlFor={field}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field === "name"
                ? "Nom complet"
                : field === "email"
                ? "Email"
                : field === "password"
                ? "Mot de passe"
                : "Confirmer le mot de passe"}
            </label>
            <input
              type={field.includes("password") ? "password" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
              className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Vous avez déjà un compte ?{" "}
        <Link
          to="/login"
          className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Signup;
