// auth.middleware.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "../config/index.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res.status(401).json({ error: "Not authorized, user not found" });

    req.user = user;

    next();
    
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token invalid" });
  }
};
