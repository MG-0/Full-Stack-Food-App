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

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Ensure DB is connected for serverless environments
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Request Logger
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`);
  next();
});

// Welcome / Health check route
app.get("/", (req, res) => {
  res.json({ success: true, message: "🍔 Food Dash API is live and running!" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 SERVER IS RUNNING SUCCESSFULLY ON PORT ${PORT}`);
  });
}

export default app;
