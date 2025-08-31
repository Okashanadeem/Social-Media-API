const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/social-media-api";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("✅ Cleared old data");

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user1 = await User.create({ username: "john", email: "john@example.com", password: hashedPassword });
    const user2 = await User.create({ username: "jane", email: "jane@example.com", password: hashedPassword });
    const user3 = await User.create({ username: "mark", email: "mark@example.com", password: hashedPassword });

    console.log("✅ Users created:", user1.username, user2.username, user3.username);

    // Add followers/following
    user1.following.push(user2._id, user3._id);
    user1.followingCount = 2;
    user2.followers.push(user1._id);
    user2.followersCount = 1;
    user3.followers.push(user1._id);
    user3.followersCount = 1;

    await user1.save();
    await user2.save();
    await user3.save();

    console.log("✅ Followers/Following set");

    // Create post by john
    const post1 = await Post.create({
      authorName: user1._id,
      text: "Hello world! This is my first post 🚀"
    });

    // Add likes (jane & mark like john's post)
    post1.likes.push(user2._id, user3._id);
    await post1.save();

    console.log("✅ Post created with likes:", post1.text);

    // Create a comment by jane on john's post
    const comment1 = await Comment.create({
      post: post1._id,
      authorName: user2._id,
      text: "Nice post!"
    });

    post1.comments.push(comment1._id);
    await post1.save();

    console.log("✅ Comment created:", comment1.text);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();
