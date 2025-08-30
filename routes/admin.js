import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import { requireRole } from "../middleware/requireRole.js";

router.get("/dashboard", auth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

export default router;
