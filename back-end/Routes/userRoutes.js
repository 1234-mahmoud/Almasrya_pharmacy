import express from "express";
import { getUsersCount } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/count",
  getUsersCount
);

export default router;