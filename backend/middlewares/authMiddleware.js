
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Accès refusé : token manquant" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    const userId = decoded.userId;


    if (!userId) {
      return res.status(401).json({ message: "Token invalide (ID manquant)" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

module.exports = authMiddleware;
