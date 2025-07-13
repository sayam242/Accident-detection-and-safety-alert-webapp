const express = require("express");
const router = express.Router();
const Hospital = require("../models/accidents/Reports");




// Example POST route
router.post("/report", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Report received!" });
});

module.exports = router;