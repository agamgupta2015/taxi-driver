const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  aadharNumber: { type: String, required: true },
  panNumber: { type: String, required: true },
  accountNumber: { type: String, required: true },
  upiId: { type: String, required: true },
});

const KYC = mongoose.model('KYC', kycSchema);

module.exports = KYC;