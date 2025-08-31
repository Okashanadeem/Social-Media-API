import express from "express";
import { followUser, unfollowUser } from "../controllers/follow.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get('/profile', auth, (req, res) => {
});

/**
 * @swagger
 * /api/follow/{id}:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Followed successfully
 */
router.post("/:id", auth, followUser);

/**
 * @swagger
 * /api/follow/{id}:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unfollowed successfully
 */
router.delete("/:id", auth, unfollowUser);

export default router;