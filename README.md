# 📌 Social Media Backend API

A **mini social media backend** built with **Node.js, Express, MongoDB, and Mongoose**.
This project demonstrates key backend concepts such as **user authentication, profile management, CRUD operations, file uploads, middleware, and aggregation pipelines**.

---

## 🚀 Features

* **Authentication & Authorization**

  * User registration & login (JWT, bcrypt)
  * Role-based access control
  * Secure password hashing

* **User Management**

  * Create/update profile (username, bio, avatar upload)
  * Follow/unfollow users
  * Suspend/activate profile
  * View profiles with follower/following counts

* **Posts**

  * Create, update, delete own posts (text + images)
  * View public feed
  * Aggregation for top liked posts and active users

* **Likes & Comments**

  * Like/unlike posts
  * Add/remove comments
  * Optional: like/unlike comments
  * Aggregation for likes and comments count

* **File Uploads**

  * Multer for avatar & post images
  * File path storage in MongoDB

* **Validation & Middleware**

  * Input validation with Joi
  * Custom middlewares for authentication, errors, and roles
  * Global error handling

---

## 🔥 Optional / Upgraded Features (if time allows)

1. Full-text Search (users & posts)
2. Notifications for follow/like/comment events
3. Pagination for feeds & comments
4. Analytics dashboard for top posts & active users
5. Real-time updates with Socket.IO
6. Docker + GitHub Actions (CI/CD)
7. File storage migration to S3/Cloudinary
8. Security hardening (rate-limiting, Helmet, sanitization)

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT + bcrypt
* **Validation:** Joi
* **File Uploads:** Multer
* **Extra:** Aggregation Pipelines, Middleware

---

## 📂 Project Structure

```
/project-root
│── /src
│   │── /models        # Mongoose schemas
│   │── /routes        # Express routes (users, posts, auth)
│   │── /middleware    # JWT, error handling, role-based auth
│   │── /controllers   # Business logic for each route
│   │── /uploads       # Uploaded images
│   └── app.js         # Main Express app
│── package.json
│── README.md
```

---

## ⚡ Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/Okashanadeem/Social-Media-API.git
cd Social-Media-API
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. **Run the server**

```bash
npm start
```

---

## 📖 API Endpoints (Basic)

### Auth

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login and get JWT

### Users

* `GET /api/users/:id` → Get user profile
* `PUT /api/users/:id` → Update profile
* `POST /api/users/follow/:id` → Follow/unfollow user
* `PATCH /api/users/suspend/:id` → Suspend a profile

### Posts

* `POST /api/posts` → Create new post
* `GET /api/posts` → Get all posts (feed)
* `PUT /api/posts/:id` → Update own post
* `DELETE /api/posts/:id` → Delete own post

### Interactions

* `POST /api/posts/:id/like` → Like/unlike a post
* `POST /api/posts/:id/comment` → Add comment

---

## 👨‍💻 Team Members

* Sheheryaar Ansar
* Okasha Nadeem
* Umair

---

## 🎯 Learning Outcomes

* Practical experience with **backend development** using Node.js & Express
* Hands-on usage of **MongoDB & Mongoose for schema design & queries**
* Implementation of **secure authentication & role-based access control**
* Exposure to **middleware, file uploads, error handling, and pagination**
* Optional learning with **real-time communication & DevOps tools**

---

👉 This project is part of our **Mid-Term Backend Development Course at BanoQabil** and focuses on applying all topics covered so far.
