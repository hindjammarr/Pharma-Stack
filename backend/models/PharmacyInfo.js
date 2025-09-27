import mongoose from "mongoose";

const pharmacyInfoSchema = new mongoose.Schema({
  horaires: String,
  pharmacieDeGarde: String,
  adresse: String,
  telephone: String
});

export default mongoose.model("PharmacyInfo", pharmacyInfoSchema);
