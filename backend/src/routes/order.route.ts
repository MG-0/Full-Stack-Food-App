import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

// CREATE ORDER
router.post("/create", authMiddleware, createOrder);

// GET MY ORDERS
router.get("/my-orders", authMiddleware, getMyOrders);

// GET ORDER BY ID
router.get("/:id", authMiddleware, getOrderById);

// GET ALL ORDERS
router.get("/", authMiddleware, adminOnly, getAllOrders);

// UPDATE ORDERS
router.put("/:id/status", authMiddleware, adminOnly, updateOrderStatus);

export default router;
