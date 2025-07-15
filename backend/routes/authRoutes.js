const express = require("express");
const router = express.Router();
const jwt      = require("jsonwebtoken");          // optional – only if you want JWT
const Hospital = require("../models/accounts/Hospital");    // adjust path
const SECRET   = process.env.JWT_SECRET || "secret_key";  // keep this in env vars in production

// Register
router.post("/create2", async (req, res) => {
  try {
    const { hospitalname, email, password, location } = req.body;

    const existing = await Hospital.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newHospital = new Hospital({ hospitalname, email, password, location });
    await newHospital.save();

    res.status(201).json({ 
      message: "Hospital account created",
      hospital: {
        _id: newHospital._id,
        email: newHospital.email,
        hospitalname: newHospital.hospitalname
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});


// Login
router.post("/login", async (req, res) => {
  console.log("inside API");
  try {
    const { email, password,  } = req.body;

    // 1️⃣  Find hospital by email
    const hospital = await Hospital.findOne({ email });
    if (!hospital){
      console.log("not finding hospital")
      return res.status(404).json({ success: false, message: "Hospital not found" });}

    // 2️⃣  Validate password (use bcrypt in real projects)
    if (hospital.password !== password){
      console.log("wrong password")
      return res.status(401).json({ success: false, message: "Invalid password" });}
    console.log("inside API");
    
    // 3️⃣  (Optional) create a JWT
    const token = jwt.sign(
      { id: hospital._id, role: "hospital" },
      SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣  Respond with JSON
    res.json({
      success: true,
      hospital: {
        _id:        hospital._id,
        name:       hospital.hospitalname,
        location:   hospital.location,   // GeoJSON Point
        email:      hospital.email
      },
      token        // send token if you generated it
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});
router.get("/test", (req, res) => res.send("Auth route working"));

module.exports = router;
