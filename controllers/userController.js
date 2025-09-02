const User = require('../models/userModel');

// Update profile
  exports.updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    let avatar = req.file ? `/uploads/avatars/${req.file.filename}` : undefined;

    const update = {};
    if (username) update.username = username;
    if (bio) update.bio = bio;
    if (avatar) update.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { $set: update },
      { new: true }
    );

    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Get profile
 exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.user.id; 
    const user = await User.findById(userId)
      .select('username bio avatar followersCount followingCount')
      .lean();

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Set status
exports.setStatus = async(req, res) => {
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

