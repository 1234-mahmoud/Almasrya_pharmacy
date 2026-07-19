import express from "express";

import {
  addMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine
} from "../controllers/medicineController.js";

const router = express.Router();

// add medicine
router.post("/", addMedicine);

// get medicines
router.get("/", getMedicines);

//update medicine router
router.put("/:id", updateMedicine);

//delete medicine router
router.delete("/:id", deleteMedicine);


export default router;
