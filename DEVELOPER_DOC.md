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

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "username": "johndoe",
      "avatarUrl": null
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "usernameOrEmail": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "name": "John Doe"
    }
  }
}
```

### User Management

#### Get User Profile
```http
GET /api/users/:username
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "username": "johndoe",
      "bio": "Software Developer",
      "avatarUrl": "/uploads/avatars/avatar.jpg",
      "followersCount": 150,
      "followingCount": 75
    }
  }
}
```

#### Update Profile
```http
PUT /api/users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Smith",
  "bio": "Full Stack Developer"
}
```

#### Upload Avatar
```http
PUT /api/users/me/avatar
Authorization: Bearer {token}
Content-Type: multipart/form-data

avatar: [file]
```

### Social Features

#### Follow User
```http
POST /api/users/:username/follow
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "following": true,
    "followersCount": 151,
    "followingCount": 76
  }
}
```

#### Unfollow User
```http
POST /api/users/:username/unfollow
Authorization: Bearer {token}
```

### Posts

#### Create Post
```http
POST /api/posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

text: "Hello World!"
image: [file] (optional)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439012",
    "text": "Hello World!",
    "imageUrl": "/uploads/posts/image.jpg",
    "likesCount": 0,
    "commentsCount": 0,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Post
```http
GET /api/posts/:id
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Updated post content"
}
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer {token}
```

### Interactions

#### Like/Unlike Post
```http
POST /api/posts/:id/like
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "liked": true,
    "likesCount": 12
  }
}
```

#### Add Comment
```http
POST /api/posts/:id/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "Great post!"
}
```

#### Get Comments
```http
GET /api/posts/:id/comments?page=1&limit=20
```

### Feed

#### Get Personalized Feed
```http
GET /api/feed?page=1&limit=20&sort=recent
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "507f1f77bcf86cd799439012",
        "text": "Hello World!",
        "imageUrl": "/uploads/posts/image.jpg",
        "likesCount": 5,
        "commentsCount": 2,
        "likedByUser": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "author": {
          "id": "507f1f77bcf86cd799439011",
          "username": "johndoe",
          "name": "John Doe",
          "avatarUrl": "/uploads/avatars/avatar.jpg"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

### Analytics

#### Get Top Posts
```http
GET /api/stats/top-posts?days=7&limit=5
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "507f1f77bcf86cd799439012",
        "text": "Popular post content",
        "likesCount": 150,
        "commentsCount": 45,
        "author": {
          "username": "johndoe",
          "name": "John Doe"
        }
      }
    ]
  }
}
```

### Admin

#### Get All Users (Admin)
```http
GET /api/admin/users
Authorization: Bearer {admin-token}
```

#### Delete User (Admin)
```http
DELETE /api/admin/users/:id
Authorization: Bearer {admin-token}
```

#### Get System Statistics (Admin)
```http
GET /api/admin/stats
Authorization: Bearer {admin-token}
```

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
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── post.service.js
│   │   ├── follow.service.js
│   │   └── analytics.service.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── comment.model.js
│   │   ├── follow.model.js
│   │   └── like.model.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── posts.routes.js
│   │   ├── feed.routes.js
│   │   └── admin.routes.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   ├── uploads/
│   │   └── multer.js             # File upload config
│   ├── app.js                    # Express app config
│   └── server.js                 # Server entry point
├── scripts/
│   ├── seed.js                   # Database seeding
│   └── reset-db.js               # Reset DB
├── uploads/                      # Local file uploads (dev only)
├── .env.example
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
