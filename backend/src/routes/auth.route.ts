import { Router } from "express";
import { regester, login, logout } from "../controllers/auth.controller";

const router = Router();

// Register User
router.post('/regester', regester);

// Login User
router.post('/login', login);

// Logout User 
router.post('/logout', logout);

export default router;