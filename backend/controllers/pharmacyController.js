import Pharmacy from "../models/PharmacyInfo.js";

export const getPharmacies = async (req, res) => {
  const pharmacies = await Pharmacy.find({});
  res.json(pharmacies);
};

export const createPharmacy = async (req, res) => {
  const pharmacy = new Pharmacy(req.body);
  const created = await pharmacy.save();
  res.status(201).json(created);
};

export const updatePharmacy = async (req, res) => {
  const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pharmacy);
};

export const deletePharmacy = async (req, res) => {
  await Pharmacy.findByIdAndDelete(req.params.id);
  res.json({ message: "Pharmacy deleted" });
};
