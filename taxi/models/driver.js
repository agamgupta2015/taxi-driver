const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
    },
  });
  
  const Driver = mongoose.model('Driver', driverSchema);
  module.exports = Driver;