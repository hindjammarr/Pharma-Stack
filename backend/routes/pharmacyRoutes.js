// import express from "express";
// import { getPharmacies, createPharmacy, updatePharmacy, deletePharmacy } from "../controllers/pharmacyController.js";
// import { protect } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/", getPharmacies);
// router.post("/", protect, createPharmacy);
// router.put("/:id", protect, updatePharmacy);
// router.delete("/:id", protect, deletePharmacy);

// export default router;


const express = require('express');
const PharmacyInfo = require('../models/PharmacyInfo');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Get pharmacy info
router.get('/', async (req, res) => {
  try {
    let info = await PharmacyInfo.findOne();
    
    if (!info) {
      // Create default info if none exists
      info = new PharmacyInfo();
      await info.save();
    }
    
    res.json(info);
  } catch (error) {
    console.error('Get pharmacy info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update pharmacy info (admin only)
router.put('/', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    let info = await PharmacyInfo.findOne();
    
    if (!info) {
      info = new PharmacyInfo(req.body);
    } else {
      Object.assign(info, req.body);
      info.updatedAt = new Date();
    }
    
    await info.save();
    res.json(info);
  } catch (error) {
    console.error('Update pharmacy info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;