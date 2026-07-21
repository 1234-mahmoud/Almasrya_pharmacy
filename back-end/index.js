import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import passport from "passport";

import "./config/passport.js";

import authRoutes from "./Routes/authRoutes.js";
import medicineRoutes from "./Routes/medicineRoutes.js";
import userRoutes from "./Routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL?.replace(/\/+$/, ""),
      "http://localhost:5173",
    ].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());

app.use(passport.initialize());

// routes
app.use("/api/auth", authRoutes);

//medicines
app.use("/api/medicines", medicineRoutes);

//users
app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
