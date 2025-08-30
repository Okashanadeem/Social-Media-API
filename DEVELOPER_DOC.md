# Social Media API

A secure, production-ready Node.js + Express REST API backend for a social media platform with comprehensive features including JWT authentication, user profiles, social following, posts with media support, interactions, personalized feeds, and analytics.

## 🚀 Features

- **RESTful API Design**: Clean, consistent API endpoints following REST principles
- **JWT Authentication**: Secure token-based authentication system
- **User Management**: Profile CRUD operations with avatar uploads
- **Social Graph**: Follow/unfollow system with atomic counter updates
- **Content Management**: Post creation, editing, deletion with image support
- **Engagement Features**: Like/unlike posts and threaded comment system
- **Personalized Feeds**: Algorithm-based content delivery for users
- **Analytics Engine**: User activity and content performance metrics
- **Admin Dashboard APIs**: Content moderation and user management endpoints
- **File Upload System**: Secure image handling with cloud storage support
- **Search Functionality**: Full-text search across users and posts
- **Rate Limiting**: API protection against abuse and spam

## 📋 Table of Contents | Quick Access

- [Installation](#installation)  
- [API Documentation](#api-documentation)  
- [Database Schema](#database-schema)  
- [Modules & Development Order](#modules--development-order)  
- [Project Structure](#project-structure)  
- [Development](#development)  


## 🛠 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/social-media-api.git
   cd social-media-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the API server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   ```


## 📖 API Documentation

### Base URL
```
Local Development: http://localhost:3000/api
```

### Response Format
All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {} // Optional validation details
  }
}
```

## 1. **Auth APIs**

| Method | Endpoint             | Description                             | Request Body                          | Response                                   |
| ------ | -------------------- | --------------------------------------- | ------------------------------------- | ------------------------------------------ |
| `POST` | `/api/auth/register` | Register a new user                     | `{ name, username, email, password }` | `{ message, user: {id, username, email} }` |
| `POST` | `/api/auth/login`    | Login with credentials                  | `{ email, password }`                 | `{ token, user: {id, username, email} }`   |
| `POST` | `/api/auth/logout`   | Logout user (client just deletes token) | -                                     | `{ message: "Logged out" }`                |

---

## 2. **User APIs**

| Method | Endpoint                        | Description                     | Request Body                               | Response                                                                   |
| ------ | ------------------------------- | ------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/api/users/me`                 | Get own profile (auth required) | -                                          | `{ id, username, bio, followersCount, followingCount, avatarUrl }`         |
| `PUT`  | `/api/users/me`                 | Update profile                  | `{ username?, bio?, avatar? } (multipart)` | `{ message, updatedUser }`                                                 |
| `GET`  | `/api/users/:username`          | View public profile             | -                                          | `{ username, bio, followersCount, followingCount, avatarUrl, postsCount }` |
| `POST` | `/api/users/:username/follow`   | Follow a user                   | -                                          | `{ message, followersCount, followingCount }`                              |
| `POST` | `/api/users/:username/unfollow` | Unfollow a user                 | -                                          | `{ message, followersCount, followingCount }`                              |

---

## 3. **Post APIs**

| Method   | Endpoint                    | Description           | Request Body                   | Response                                                       |
| -------- | --------------------------- | --------------------- | ------------------------------ | -------------------------------------------------------------- |
| `POST`   | `/api/posts`                | Create a new post     | `{ text, image? } (multipart)` | `{ id, text, imageUrl, createdAt }`                            |
| `GET`    | `/api/posts/:id`            | Get a single post     | -                              | `{ id, text, imageUrl, likesCount, commentsCount, createdBy }` |
| `PUT`    | `/api/posts/:id`            | Update own post       | `{ text?, image? }`            | `{ message, updatedPost }`                                     |
| `DELETE` | `/api/posts/:id`            | Delete own post       | -                              | `{ message: "Post deleted" }`                                  |
| `GET`    | `/api/posts/user/:username` | Get all posts by user | -                              | `[ { post1 }, { post2 } ... ]`                                 |

---

## 4. **Feed APIs**

| Method | Endpoint    | Description                | Query Params          | Response                                   |
| ------ | ----------- | -------------------------- | --------------------- | ------------------------------------------ |
| `GET`  | `/api/feed` | Get feed of followed users | `?page=&limit=&sort=` | `[ { post, likedByUser, commentsCount } ]` |

---

## 5. **Like APIs**

| Method | Endpoint              | Description                    | Request Body | Response                  |
| ------ | --------------------- | ------------------------------ | ------------ | ------------------------- |
| `POST` | `/api/posts/:id/like` | Like or unlike a post (toggle) | -            | `{ message, likesCount }` |

---

## 6. **Comment APIs**

| Method | Endpoint                  | Description             | Request Body    | Response                             |
| ------ | ------------------------- | ----------------------- | --------------- | ------------------------------------ |
| `POST` | `/api/posts/:id/comments` | Add a comment           | `{ text }`      | `{ id, text, createdBy, createdAt }` |
| `GET`  | `/api/posts/:id/comments` | Get comments for a post | `?page=&limit=` | `[ { comment1 }, { comment2 } ... ]` |

---

## 7. **Admin APIs**

| Method   | Endpoint               | Description   | Response                                |
| -------- | ---------------------- | ------------- | --------------------------------------- |
| `GET`    | `/api/admin/users`     | Get all users | `[ { user1 }, { user2 } ... ]`          |
| `DELETE` | `/api/admin/users/:id` | Delete a user | `{ message }`                           |
| `DELETE` | `/api/admin/posts/:id` | Delete a post | `{ message }`                           |
| `GET`    | `/api/admin/stats`     | Get analytics | `{ totalUsers, activeUsers, topPosts }` |

---

## 8. **Analytics APIs**

| Method | Endpoint                  | Description                     | Query Params      | Response                                          |
| ------ | ------------------------- | ------------------------------- | ----------------- | ------------------------------------------------- |
| `GET`  | `/api/stats/top-posts`    | Get top posts by likes/comments | `?days=7&limit=5` | `[ { postId, text, likesCount, commentsCount } ]` |
| `GET`  | `/api/stats/active-users` | Get active users by posts count | `?days=7&limit=5` | `[ { userId, username, postCount } ]`             |

---

## 9. **Optional APIs (If Time Allows)**

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| `GET`  | `/api/search?query=` | Full-text search in users & posts |
| `GET`  | `/api/notifications` | Pull notifications for user       |

---

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  username: { type: String, unique: true, index: true },
  email: { type: String, unique: true, index: true },
  passwordHash: String,
  bio: String,
  avatarUrl: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  _id: ObjectId,
  authorId: ObjectId,
  text: String,
  imageUrl: String,
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'removed', 'flagged'], default: 'active' },
  createdAt: Date,
  updatedAt: Date
}
```

### Follow Model
```javascript
{
  _id: ObjectId,
  followerId: ObjectId,
  followeeId: ObjectId,
  createdAt: Date
}
```

### Like Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  postId: ObjectId,
  createdAt: Date
}
```

### Comment Model
```javascript
{
  _id: ObjectId,
  postId: ObjectId,
  authorId: ObjectId,
  text: String,
  isDeleted: { type: Boolean, default: false },
  createdAt: Date,
  updatedAt: Date
}
```

## 📁 Project Structure

```
social-media-api/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── posts.controller.js
│   │   ├── feed.controller.js
│   │   └── admin.controller.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   ├── post.validator.js
│   │   ├── follow.validator.js
│   │   └── analytics.validator.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── comment.model.js
│   │   ├── follow.model.js
│   │   └── like.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── posts.routes.js
│   │   ├── feed.routes.js
│   │   └── admin.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   └── error.middleware.js
│   ├── uploads/
│   │   └── multer.js             # File upload config
│   ├── app.js                    # Express app config
│   └── server.js                 # Server entry point
├── scripts/
│   ├── seed.js                   # Database seeding
│   └── reset-db.js               # Reset DB
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Reset database
npm run reset-db
```


### Build Order & Implementation Phases

1. **Phase 0**: Project scaffolding, configuration, logging setup
2. **Phase 1**: Authentication system (register, login, JWT middleware)
3. **Phase 2**: User management (profiles, CRUD operations)
4. **Phase 3**: File upload system (avatar and post images)
5. **Phase 4**: Social features (follow/unfollow system)
6. **Phase 5**: Posts system (CRUD operations)
7. **Phase 6**: Interactions (likes and comments)
8. **Phase 7**: Feed generation and pagination
9. **Phase 8**: Search and analytics
10. **Phase 9**: Admin features and moderation
11. **Phase 10**: Testing, documentation, deployment

---

# Modules & Development Order

To ensure smooth progress, we divide the project into **independent modules**. Each module builds on the previous one, so the team can work in parallel once the base is ready.

---

## **1. Core Setup & Config (Module 1)**

**Priority:** 🔴 First

* Project structure (`src/`, `controllers/`, `routes/`, etc.).
* Express server setup.
* MongoDB connection (`config/db.js`).
* Environment variables (`.env` for PORT, DB\_URL, JWT\_SECRET).
* Global error handler + response format middleware.

👉 This is the **foundation** — must be built before other modules.

---

## **2. Authentication & User Management (Module 2)**

**Priority:** 🔴 Second

* User registration & login (`/auth/register`, `/auth/login`).
* JWT token generation & middleware.
* User profile CRUD (`/users/:id`).
* Password hashing (bcrypt).

👉 Critical for securing all future modules. Nothing else works without **users + login system**.

---

## **3. Posts & Content System (Module 3)**

**Priority:** 🟠 Third

* Create, read, update, delete posts (`/posts`).
* Image/file upload support (Multer).
* Link posts with `userId`.
* Basic feed of all posts.

👉 Once auth is ready, users should be able to **post content**.

---

## **4. Social Interactions (Likes & Comments) (Module 4)**

**Priority:** 🟠 Fourth

* Like/unlike posts (`/posts/:id/like`).
* Comment CRUD (`/posts/:id/comments`).
* Notification triggers for like/comment (optional for bonus).

👉 Adds engagement — after content exists.

---

## **5. Feed & Follows (Module 5)**

**Priority:** 🟢 Fifth

* Follow/unfollow users (`/users/:id/follow`).
* Personalized feed (posts only from followed users).
* Explore feed (random/public posts).

👉 This turns the app from “just posting” → **social media experience**.

---

## **6. Search & Analytics (Module 6)**

**Priority:** 🟢 Sixth

* Search users by name/username.
* Search posts by text/hashtags.
* Analytics endpoints:

  * Most liked posts.
  * Most active users.
  * Daily/weekly post count.

👉 Useful for insights + extra marks.

---

## **7. Admin Panel & Moderation (Module 7)**

**Priority:** 🟢 Seventh (Optional / Advanced)

* Suspend/unsuspend users.
* Delete any post or comment.
* View system-wide analytics.

👉 Only required if time permits, but makes the project **look professional**.

---
