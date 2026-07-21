import express from "express";

import passport from "passport";

import {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  resetPassword,
  forgetPassword,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// register
router.post(
  "/register",
  registerUser
);


// login
router.post(
  "/login",
  loginUser
);


// get current user
router.get(
  "/me",
  protect,
  getMe
);


// update profile
router.put(
  "/update-profile",
  protect,
  updateProfile
);


// google login
router.get(
  "/google",

  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email",
      ],
    }
  )
);


// google callback
router.get(
  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false,

      failureRedirect:
        "/api/auth/login",
    }
  ),

 (req, res) => {

    const token = req.user.token;

    res.redirect(
      `http://localhost:5173/google-success?token=${token}`
    );
  }
);

router.post("/forgot-password",forgetPassword)
router.post("/reset-password/:token",resetPassword)



















export default router;