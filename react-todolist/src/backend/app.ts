import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
