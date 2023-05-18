// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const Database = require("./config/db")
app.use(bodyParser.json());
app.use(cors());

Database();

const otp = require("./routes/otpverify");
const kyc = require("./routes/kyc");
const mai  = require("./routes/main");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health",(req,res)=>{
  res.send("Server is Runing fine")
})

app.use("/api",otp);
app.use("/api",kyc);
app.use("/api",mai)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
