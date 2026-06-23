import {
  deleteCategory,
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";
import { Router } from "express";

const router = Router();

// Get Category By ID
router.get("/:id", getCategory);

// Get All Categories
router.get("/", getAllCategories);

// Create Category
router.post("/create", authMiddleware, adminOnly, createCategory);

// Update Category
router.put("/update/:id", authMiddleware, adminOnly, updateCategory);

// Deleted Category
router.delete("/delete/:id", authMiddleware, adminOnly, deleteCategory);

export default router;
