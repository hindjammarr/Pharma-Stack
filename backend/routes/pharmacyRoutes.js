import express from "express";
import { getPharmacies, createPharmacy, updatePharmacy, deletePharmacy } from "../controllers/pharmacyController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPharmacies);
router.post("/", protect, createPharmacy);
router.put("/:id", protect, updatePharmacy);
router.delete("/:id", protect, deletePharmacy);

export default router;
