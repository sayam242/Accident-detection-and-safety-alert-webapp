const express = require("express");
const router = express.Router();

// Example POST route
router.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Report received!" });
});

module.exports = router;