import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/sendEmails.js";
// REGISTER
export const registerUser = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      phone,
      street_address,
      city,
      state,
      zip_code,
    } = req.body;

    if (!fullname?.trim() || !email?.trim() || !password) {
      return res
        .status(400)
        .json({ message: "Full name, email and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // check email
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [normalizedEmail],
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const newUser = await pool.query(
      `
          INSERT INTO users
          (
            full_name,
            email,
            password,
            role,
            phone,
            street_address,
            city,
            state,
            zip_code
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING
          id,
          full_name,
          email,
          role
          `,
      [
        fullname.trim(),
        normalizedEmail,
        hashedPassword,
        "user",
        phone?.trim() || null,
        street_address?.trim() || null,
        city?.trim() || null,
        state?.trim() || null,
        zip_code?.trim() || null,
      ],
    );

    res.status(201).json({
      message: "User registered successfully",

      user: newUser.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email?.trim() || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // check user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email.trim().toLowerCase()],
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (role && role !== user.role) {
      return res.status(400).json({
        message: `This account is registered as ${user.role}`,
      });
    }

    // create token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,

      user: {
        id: user.id,
        fullname: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const formatUser = (user) => ({
  id: user.id,
  fullname: user.full_name,
  full_name: user.full_name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  street_address: user.street_address,
  city: user.city,
  state: user.state,
  zip_code: user.zip_code,
});

// GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const userResult = await pool.query(
      `
          SELECT
            id,
            full_name,
            email,
            role,
            phone,
            street_address,
            city,
            state,
            zip_code
          FROM users
          WHERE id = $1
          `,
      [req.user.id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      user: formatUser(userResult.rows[0]),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { fullname, phone, street_address, city, state, zip_code } = req.body;

    const updatedUser = await pool.query(
      `
          UPDATE users
          SET
            full_name = COALESCE($1, full_name),
            phone = COALESCE($2, phone),
            street_address = COALESCE($3, street_address),
            city = COALESCE($4, city),
            state = COALESCE($5, state),
            zip_code = COALESCE($6, zip_code)
          WHERE id = $7
          RETURNING
            id,
            full_name,
            email,
            role,
            phone,
            street_address,
            city,
            state,
            zip_code
          `,
      [fullname, phone, street_address, city, state, zip_code, req.user.id],
    );

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "Profile updated successfully",
      user: formatUser(updatedUser.rows[0]),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

//forgot
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email.trim().toLowerCase(),
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );

    // Remove a trailing slash so the email link always has one valid path.
    const clientUrl = (
      process.env.CLIENT_URL || "http://localhost:5173"
    ).replace(/\/+$/, "");
    const resetLink = `${clientUrl}/forget?token=${encodeURIComponent(token)}`;

    await sendEmail(
      user.email,
      "Reset Password",
      `
      <h2>Password Reset</h2>

      <p>Click the button below to reset your password.</p>

      <a href="${resetLink}">
      Reset Password
      </a>
      `,
    );

    return res.status(200).json({
      message: "Reset link sent successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      UPDATE users
      SET password = $1
      WHERE id = $2
      `,
      [hashedPassword, decoded.id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
