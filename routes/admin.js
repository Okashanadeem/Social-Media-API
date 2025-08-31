const express = require("express");
const { auth } = require("../middlewares/auth.js");
const { requireRole } = require("../middlewares/requireRole.js");

const router = express.Router()

router.get("/dashboard", auth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

module.exports = router