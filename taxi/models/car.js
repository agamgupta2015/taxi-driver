const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carNumber: { type: String, required: true },
    insuranceNumber: { type: String, required: true },
    chassisNumber: { type: String, required: true },
    permitNumber: { type: String, required: true },
    model: { type: String, required: true },
    carName: { type: String, required: true },
    fuelType: { type: String, required: true },
    numberOfSeats: { type: Number, required: true },
  });
  
  const Car = mongoose.model('Car', carSchema);
  module.exports = Car;