import { User } from "../models/user.model.js";
import Follow from "../models/follow.model.js";

export async function followUser(req, res) {
  try {
    const targetId = req.params.id;
    if (targetId === req.user._id.toString()) {
      return res.status(400).json({ error: "Cannot follow yourself" });
    }

    const targetUser = await User.findById(targetId);
    if (!targetUser || targetUser.status !== "active") {
      return res.status(404).json({ error: "User not found or suspended" });
    }

    const follow = new Follow({
      follower: req.user._id,
      following: targetId,
    });

    await follow.save();

    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { following: targetId },
      $inc: { followingCount: 1 },
    });
    await User.findByIdAndUpdate(targetId, {
      $addToSet: { followers: req.user._id },
      $inc: { followersCount: 1 },
    });

    res.json({ message: "Followed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Already following" });
    }
    res.status(400).json({ error: err.message });
  }
}

export async function unfollowUser(req, res) {
  try {
    const targetId = req.params.id;
    await Follow.findOneAndDelete({
      follower: req.user._id,
      following: targetId,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { following: targetId },
      $inc: { followingCount: -1 },
    });
    await User.findByIdAndUpdate(targetId, {
      $pull: { followers: req.user._id },
      $inc: { followersCount: -1 },
    });

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}