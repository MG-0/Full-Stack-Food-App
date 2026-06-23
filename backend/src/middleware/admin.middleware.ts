import { AuthRequest, ApiResponse } from "../types/index";
import { Response, NextFunction } from "express";

export const adminOnly = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const role = req.user?.role !== "admin";
  if (role) {
    const response: ApiResponse = {
      success: false,
      message: "Access denied. Admins only",
    };
    res.status(403).json(response);
    return;
  }
  next();
};
