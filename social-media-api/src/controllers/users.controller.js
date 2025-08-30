import { User } from '../models/user.model.js';
import Follow from '../models/follow.model.js';

export async function updateProfile(req, res) {
  try {
    const { username, bio } = req.body;
    let avatar = req.file ? `/uploads/avatars/${req.file.filename}` : undefined;

    const update = {};
    if (username) update.username = username;
    if (bio) update.bio = bio;
    if (avatar) update.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: update },
      { new: true }
    );
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function getProfile(req, res) {
  try {
    const userId = req.params.id || req.user._id;
    const user = await User.findById(userId)
      .select('username bio avatar status')
      .lean();

    if (!user) return res.status(404).json({ error: 'User not found' });

    const followerCount = await Follow.countDocuments({ following: userId });
    const followingCount = await Follow.countDocuments({ follower: userId });

    res.json({
      ...user,
      followerCount,
      followingCount
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function setStatus(req, res) {
  try {
    const { status } = req.body; 
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}