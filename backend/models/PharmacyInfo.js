
const mongoose = require('mongoose');

const pharmacyInfoSchema = new mongoose.Schema({
  horaires: {
    type: String,
    default: 'Lundi - Vendredi: 8h00 - 19h00\nSamedi: 8h00 - 12h00'
  },
  pharmacieDeGarde: {
    type: Boolean,
    default: false
  },
  adresse: {
    type: String,
    default: '123 Rue de la Pharmacie, 75000 Paris'
  },
  telephone: {
    type: String,
    default: '+33 1 23 45 67 89'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PharmacyInfo', pharmacyInfoSchema);