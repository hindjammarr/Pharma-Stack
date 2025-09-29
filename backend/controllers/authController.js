// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // export const registerUser = async (req, res) => {
// //   const { name, email, password } = req.body;

// //   const userExists = await User.findOne({ email });
// //   if (userExists) return res.status(400).json({ message: "User already exists" });

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const user = await User.create({ name, email, password: hashedPassword });
// //   res.status(201).json({ token: generateToken(user._id), user });
// // };

// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({ token: generateToken(user._id), user });
//   } catch (err) {
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({ token: generateToken(user._id), user });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// };

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });


// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Génère un token JWT
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// // ✅ Inscription
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     console.log("📧 [REGISTER] Email enregistré :", email);

//         console.log("🔐 [REGISTER] Mot de passe reçu :", password);

//     // Validation simple
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Tous les champs sont requis" });
//     }

//     // Vérifie si l'utilisateur existe déjà
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Utilisateur déjà existant" });
//     }

//     // Hash du mot de passe
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("🔐 [REGISTER] Mot de passe hashé :", hashedPassword);
//     // Création de l'utilisateur
//     const user = await User.create({ name, email, password: hashedPassword });

//     // Exclure le mot de passe de la réponse
//     const { password: _, ...safeUser } = user._doc;

//     res.status(201).json({
//       token: generateToken(user._id),
//       user: safeUser,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

// // ✅ Connexion
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//  console.log("📧 [LOGIN] Email recherché :", email);
// console.log("🔐 [LOGIN] Mot de passe en base :", user.password);

//     // Validation simple
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email et mot de passe requis" });
//     }

//     // Recherche de l'utilisateur
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Utilisateur non trouvé" });
//     }

//     // Vérifie le mot de passe
//     const isMatch = await bcrypt.compare(password, user.password);
//         console.log("🔍 [LOGIN] Résultat comparaison bcrypt :", isMatch);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Mot de passe incorrect" });
//     }

//     // Exclure le mot de passe de la réponse
//     const { password: _, ...safeUser } = user._doc;

//     res.status(200).json({
//       token: generateToken(user._id),
//       user: safeUser,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Génère un token JWT
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// // ✅ Inscription sans hash
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "Tous les champs sont requis" });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "Utilisateur déjà existant" });
//     }

//     const user = await User.create({ name, email, password });

//     const { password: _, ...safeUser } = user._doc;
//     res.status(201).json({ token: generateToken(user._id), user: safeUser });
//   } catch (err) {
//     console.error("❌ [REGISTER] Erreur :", err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };

// // ✅ Connexion sans hash
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email et mot de passe requis" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Utilisateur non trouvé" });
//     }

//     if (user.password !== password) {
//        console.log("Mot de passe reçu :", password);
//       console.log("Mot de passe en base :", user.password);
//       return res.status(401).json({ message: "Mot de passe incorrect" });
//     }

//     const { password: _, ...safeUser } = user._doc;
//     res.status(200).json({ token: generateToken(user._id), user: safeUser });
//   } catch (err) {
//     console.error("❌ [LOGIN] Erreur :", err);
//     res.status(500).json({ message: "Erreur serveur" });
//   }
// };


import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔐 Génère un token JWT avec rôle
const generateToken = (user) => {
  return jwt.sign({ id: user._id, }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Inscription
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ [REGISTER] Erreur :", error);
    res.status(500).json({ message: error.message });
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
        // role: user.role,
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
