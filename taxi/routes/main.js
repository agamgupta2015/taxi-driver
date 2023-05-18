const { Router } = require("express");
const route = Router();

route.post('/cars', (req, res) => {
    const {
      carNumber,
      insuranceNumber,
      chassisNumber,
      permitNumber,
      model,
      carName,
      fuelType,
      numberOfSeats,
    } = req.body;
  
    const car = new Car({
      carNumber,
      insuranceNumber,
      chassisNumber,
      permitNumber,
      model,
      carName,
      fuelType,
      numberOfSeats,
    });
  
    car.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add the car' });
      } else {
        res.status(201).json({ message: 'Car added successfully' });
      }
    });
  });
  
  // Add a driver
route.post('/drivers', (req, res) => {
    const { name, licenseNumber, carId } = req.body;
  
    const driver = new Driver({
      name,
      licenseNumber,
      car: carId,
    });
  
    driver.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add the driver' });
      } else {
        res.status(201).json({ message: 'Driver added successfully' });
      }
    });
  });
  
  // Add a credit
route.post('/credits', (req, res) => {
    const { amount, status } = req.body;
  
    const credit = new Credit({
      amount,
      status,
    });
  
    credit.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add the credit' });
      } else {
        res.status(201).json({ message: 'Credit added successfully' });
      }
    });
  });

  module.exports = route;