// utils/seed.js 
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/social-media-api";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old data
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({})
    ]);
    console.log("Cleared old data");

    // Hash password once
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create users (including an admin)
    const users = await Promise.all([
      User.create({ username: "john", email: "john@example.com", password: hashedPassword }),
      User.create({ username: "jane", email: "jane@example.com", password: hashedPassword }),
      User.create({ username: "mark", email: "mark@example.com", password: hashedPassword }),
      User.create({ username: "lucy", email: "lucy@example.com", password: hashedPassword }),
      User.create({ username: "peter", email: "peter@example.com", password: hashedPassword }),
      User.create({ username: "admin", email: "admin@example.com", password: hashedPassword, role: "admin" })
    ]);

    const [userJohn, userJane, userMark, userLucy, userPeter, adminUser] = users;

    console.log("Users created:", users.map(u => u.username).join(", "));

    // Followers/Following
    userJohn.following.push(userJane._id, userMark._id, userLucy._id);
    userJane.following.push(userMark._id);
    userMark.following.push(userJohn._id, userPeter._id);
    userLucy.following.push(userJane._id, userMark._id);
    userPeter.following.push(userJohn._id);

    userJohn.followingCount = userJohn.following.length;
    userJane.followingCount = userJane.following.length;
    userMark.followingCount = userMark.following.length;
    userLucy.followingCount = userLucy.following.length;
    userPeter.followingCount = userPeter.following.length;

    userJane.followers.push(userJohn._id, userLucy._id);
    userJane.followersCount = userJane.followers.length;

    userMark.followers.push(userJohn._id, userJane._id, userLucy._id);
    userMark.followersCount = userMark.followers.length;

    userLucy.followers.push(userJohn._id);
    userLucy.followersCount = userLucy.followers.length;

    userPeter.followers.push(userMark._id);
    userPeter.followersCount = userPeter.followers.length;

    await Promise.all(users.map(u => u.save()));
    console.log("Followers/Following set");

    // Posts
    const posts = await Promise.all([
      Post.create({ authorName: userJohn._id, text: "Hello world! 🚀" }),
      Post.create({ authorName: userJane._id, text: "Coffee is life ☕" }),
      Post.create({ authorName: userMark._id, text: "Coding late night 🌙" }),
      Post.create({ authorName: userLucy._id, text: "Just finished a 5K run 🏃‍♀️" }),
      Post.create({ authorName: userPeter._id, text: "Travel diaries ✈️" }),
      Post.create({ authorName: adminUser._id, text: "⚠️ Admin Announcement: Be kind!" })
    ]);

    console.log("Posts created");

    // Likes
    posts[0].likes.push(userJane._id, userMark._id, userLucy._id); // John’s post
    posts[1].likes.push(userJohn._id, userLucy._id); // Jane’s post
    posts[2].likes.push(userJohn._id, userJane._id, userPeter._id); // Mark’s post
    posts[3].likes.push(userJohn._id, userJane._id); // Lucy’s post
    posts[4].likes.push(userJohn._id, userJane._id, userMark._id, userLucy._id); // Peter’s post
    posts[5].likes.push(userJohn._id, userJane._id, userMark._id, userLucy._id, userPeter._id); // Admin’s post

    await Promise.all(posts.map(p => p.save()));
    console.log("Likes added");

    // Comments
    const comments = await Promise.all([
      Comment.create({ post: posts[0]._id, authorName: userJane._id, text: "Nice one!" }),
      Comment.create({ post: posts[0]._id, authorName: userMark._id, text: "Cool 🚀" }),
      Comment.create({ post: posts[1]._id, authorName: userJohn._id, text: "Coffee is indeed life 😅" }),
      Comment.create({ post: posts[2]._id, authorName: userLucy._id, text: "I do the same!" }),
      Comment.create({ post: posts[3]._id, authorName: userPeter._id, text: "Impressive!" }),
      Comment.create({ post: posts[4]._id, authorName: userJohn._id, text: "Where did you go?" })
    ]);

    posts[0].comments.push(comments[0]._id, comments[1]._id);
    posts[1].comments.push(comments[2]._id);
    posts[2].comments.push(comments[3]._id);
    posts[3].comments.push(comments[4]._id);
    posts[4].comments.push(comments[5]._id);

    await Promise.all(posts.map(p => p.save()));
    console.log("Comments created and attached");

    console.log("Seeding complete. Login credentials:");
    console.log("User: john@example.com / password123");
    console.log("User: jane@example.com / password123");
    console.log("Admin: admin@example.com / password123");

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    try { await mongoose.disconnect(); } catch (e) {}
    process.exit(1);
  }
};

seed();
