import { Response, NextFunction } from "express";
import { AuthRequest, JwtPayload } from "../types/index";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authMiddleware =  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ success: false, message: "Not authorized" });
            return;
        }
        const decoded =  jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload
        const user = await User.findById(decoded.id).select('-password')
        if (!user) {
            res.status(401).json({ success: false, message: "User not found" });
            return;
        }
         req.user = user;
        next()
    } catch (error) {
 res.status(401).json({ success: false, message: "Invalid token" });
    }
}