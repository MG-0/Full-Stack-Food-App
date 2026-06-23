import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
  getALlProducts,
} from "../controllers/product.controller";

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

// GET ALL PRODUCTS
router.get("/", getALlProducts);

// GET PRODUCT BY ID
router.get("/:id", getProductById);

// GET PRODUCT BY CATEGORY
router.get("/productbycategory/:categoryId", getProductsByCategory);

// CREATE PRODUCT
router.post("/create", authMiddleware, adminOnly, createProduct);

// UPDATE PRODUCT
router.put("/update/:id", authMiddleware, adminOnly, updateProduct);

// DELETE PRODUCT
router.delete("/delete/:id", deleteProduct, adminOnly, authMiddleware);

export default router;
