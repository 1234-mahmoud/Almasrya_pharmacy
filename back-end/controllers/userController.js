import pool from "../db.js";

export const getUsersCount = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM users
      WHERE role = 'user'
      `
    );

    res.status(200).json({
      totalUsers: Number(result.rows[0].total),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};