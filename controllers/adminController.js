const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("username email role createdAt");
    return res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userPosts = await Post.find({ authorName: id }).select('_id').lean();
    const postIds = userPosts.map(p => p._id);

    await Comment.deleteMany({ authorName: id });
    if (postIds.length) await Comment.deleteMany({ post: { $in: postIds } });
    await Post.deleteMany({ authorName: id });

    return res.json({ success: true, message: "User and related content deleted", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    await Comment.deleteMany({ post: id });

    return res.json({ success: true, message: "Post and comments deleted", id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalComments = await Comment.countDocuments();

    return res.json({
      success: true,
      stats: { totalUsers, totalPosts, totalComments }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Active users by post count (admin only)
exports.getActiveUsers = async (req, res) => {
  try {
    const { days = 7, limit = 5 } = req.query;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const activeUsers = await Post.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: "$authorName", postCount: { $sum: 1 } } },
      { $sort: { postCount: -1 } },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          userId: "$user._id",
          username: "$user.username",
          postCount: 1
        }
      }
    ]);

    return res.json({ success: true, activeUsers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
