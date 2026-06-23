import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";
import orderRoutes from "./routes/order.route";
import cors from "cors";


dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Request Logger
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 SERVER IS RUNNING SUCCESSFULLY ON PORT ${PORT}`);
});
