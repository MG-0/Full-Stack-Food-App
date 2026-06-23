import { authMiddleware } from "../middleware/auth.middleware";
import {
  getUserProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/user.controller";
import { adminOnly } from "../middleware/admin.middleware";
import { Router } from "express";

const router = Router();

// Get User Profile
router.get("/profile", authMiddleware, getUserProfile);

// Get All Users
router.get("/", adminOnly, authMiddleware, getAllUsers);

// delete USer
router.delete("/:id", adminOnly, authMiddleware, deleteUser);

export default router