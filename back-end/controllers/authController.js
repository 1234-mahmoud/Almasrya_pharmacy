import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // check email
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
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
            role
          )
          VALUES ($1, $2, $3, $4)
          RETURNING
          id,
          full_name,
          email,
          role
          `,
      [fullname, email, hashedPassword, "user"],
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
    const { email, password } = req.body;

    // check user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
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

//Forget Password

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query("Select * from users Where email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "user not found!!",
      });

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


const resetLink = `${process.env.CLIENT_URL}/reset?token=${token}`;
    console.log(`the reset link is ${resetLink}`);
    await sendEmail(
      user.email,
      "Reset Password",
      `
        <h2>Password Reset</h2>

        <p>Click the button below.</p>

        <a href="${resetLink}">
            Reset Password
        </a>
      `,
    );
 res.status(200).json({
      message: "Reset Link Sent Successfully",
    });

    }
  } catch (error) {
     console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


//reset

export const resetPassword = async (req, res) => {
  try {
    console.log("Params =", req.params);
    const { token } = req.params; //token from reset link

    console.log(token);
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashPassword = await bcrypt.hash(password, 10);//new password

    await pool.query(
      `
      UPDATE users
      SET password=$1
      WHERE id=$2
      `,
      [hashPassword, decoded.id], //replace old hashed password with new
    );

    res.status(200).json({
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};