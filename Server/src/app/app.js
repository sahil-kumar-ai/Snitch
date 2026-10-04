import express from "express";
import authRoutes from '../routes/auth.routes.js';
import productRoutes from '../routes/product.routes.js';
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

export default app;