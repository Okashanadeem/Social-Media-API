import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded.sub; 
    const user = await User.findById(userId);
    if (!user || user.status !== 'active') {
      return res.status(401).json({ message: 'Invalid user or suspended' });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
