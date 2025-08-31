import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.middleware.js";
import  requireRole  from "../middleware/role.middleware.js";


/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/profile', auth, (req, res) => {
  res.json({ message: "User profile data" });
});


/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/dashboard", auth, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

export default router;
