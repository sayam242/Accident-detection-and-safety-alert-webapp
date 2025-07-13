const express = require("express");
const router = express.Router();
const Hospital = require("../models/accounts/Hospital");

// Register
router.post("/create2", async (req, res) => {
  try {
    const { hospitalname, email, password, location } = req.body;

    const existing = await Hospital.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newHospital = new Hospital({ hospitalname, email, password, location });
    await newHospital.save();

    res.status(201).json({ message: "Hospital account created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hospital = await Hospital.findOne({ email:email });
    if (!hospital) return res.status(404).json({ message: "User not found" });

    if (hospital.password !== password)
      return res.status(401).json({ message: "Invalid password" });

    res.json({ message: "Login successful", hospital });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});
router.get("/test", (req, res) => res.send("Auth route working"));

module.exports = router;
