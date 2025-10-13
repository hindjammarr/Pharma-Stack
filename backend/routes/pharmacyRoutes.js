const express = require("express");
const PharmacyInfo = require("../models/PharmacyInfo");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// Get pharmacy info
router.get("/", async (req, res) => {
  try {
    let info = await PharmacyInfo.findOne();

    if (!info) {
      // Create default info if none exists
      info = new PharmacyInfo();
      await info.save();
    }

    res.json(info);
  } catch (error) {
    console.error("Get pharmacy info error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update pharmacy info (admin only)
router.put("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    let info = await PharmacyInfo.findOne();

    if (!info) {
      info = new PharmacyInfo(req.body);
    } else {
      // Object.assign(info, req.body);
      // info.nom = req.body.name || info.nom;
      info.adresse = req.body.address || info.adresse;
      info.telephone = req.body.phone || info.telephone;
      info.email = req.body.email || info.email;
      info.horaires = req.body.openingHours || info.horaires;
      info.pharmacieDeGarde = req.body.pharmacieDeGarde ?? info.pharmacieDeGarde;
      info.updatedAt = new Date();
    }

    await info.save();
    res.json(info);
  } catch (error) {
    console.error("Update pharmacy info error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
