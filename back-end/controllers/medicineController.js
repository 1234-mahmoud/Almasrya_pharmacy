import pool from "../db.js";

// ADD MEDICINE
export const addMedicine = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    const medicine = await pool.query(
      `
        INSERT INTO medicines
        (
          name,
          category,
          description,
          price
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING *
        `,
      [name, category, description, price],
    );

    res.status(201).json({
      message: "Medicine added successfully",

      medicine: medicine.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// GET ALL MEDICINES
export const getMedicines = async (req, res) => {
  try {
    const medicines = await pool.query(
      `
        SELECT *
        FROM medicines
        ORDER BY id DESC
        `,
    );

    res.json(medicines.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

//update medicine

export const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price } = req.body;

    const result = await pool.query(
      `UPDATE medicines
       SET name = $1, category = $2, description = $3, price = $4
       WHERE id = $5
       RETURNING *`,
      [name, category, description, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json(result.rows[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update medicine" });
  }
};

//delete medicine

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM medicines
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete medicine",
    });
  }
};
