import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔐 Génère un token JWT avec rôle
// const generateToken = (user) => {
//   return jwt.sign({ id: user._id, }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };
const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs sont requis",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur déjà existant",
      });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true, // ✅ AJOUT OBLIGATOIRE
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      // token: generateToken(user._id),
      token: generateToken(user),
    });
  } catch (error) {
    console.error("❌ Erreur backend inscription:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};


// ✅ Connexion
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📧 Email reçu :", email);
console.log("🔐 Mot de passe reçu :", password);


    if (!email || !password) {
      console.log("🔐 Mot de passe en base :", user.password);

      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      console.log("Mot de passe reçu :", password);
      console.log("Mot de passe en base :", user.password);
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ [LOGIN] Erreur :", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Profil utilisateur (protégé par middleware JWT)
export const getProfile = async (req, res) => {
  res.json(req.user);
};
