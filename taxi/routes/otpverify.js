const { Router } = require("express");
const route = Router();
const twilio = require('twilio'); 

const users = [];

// Generate OTP
function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Send OTP to user's mobile number
function sendOTP(phoneNumber, otp) {
  const accountSid = 'AC054493b7213ac9355c19c5c3db2ac518';
  const authToken = '0f8e14b8f3b0c39f85e5dff5fabe53ec';
  const client = twilio(accountSid, authToken);

  return client.messages.create({
    body: `Your OTP for verification is: ${otp}`,
    from: '+12525167722',
    to: phoneNumber,
  });
}

// User signup route
route.post('/signup', (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // Check if the phone number is already registered
  const existingUser = users.find((user) => user.phoneNumber === phoneNumber);
  if (existingUser) {
    return res.status(400).json({ message: 'Phone number already registered' });
  }

  // Generate OTP
  const otp = generateOTP();

  // Save user details for verification
  const user = { name, email, phoneNumber, otp };
  users.push(user);

  // Send OTP to user's mobile number
  sendOTP(phoneNumber, otp)
    .then(() => {
      res.json({ message: 'OTP sent for verification' });
    })
    .catch((error) => {
      console.error('Error sending OTP:', error);
      res.status(500).json({ message: 'Failed to send OTP' });
    });
});

// Verify OTP route
route.post('/verify', (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Find user by phone number
  const user = users.find((user) => user.phoneNumber === phoneNumber);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Check if the entered OTP matches
  if (user.otp === otp) {
    return res.json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = route;