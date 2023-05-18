const { Router } = require("express");
const route = Router();
const KYC = require("../models/kyc_dbs");

route.post('/kyc', (req, res) => {
    const { aadharNumber, panNumber, accountNumber, upiId } = req.body;
  
    const kyc = new KYC({
      aadharNumber,
      panNumber,
      accountNumber,
      upiId,
    });
  
    kyc.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save KYC entry' });
      } else {
        res.status(201).json({ message: 'KYC entry saved successfully' });
      }
    });
  });
  module.exports = route;