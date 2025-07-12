import { Router } from "express";
import {
  getAdoptions,
  getAdoptionById,
  createAdoption,
  deleteAdoption,
} from "../controllers/adoption.controller.js";

const router = Router();

router.get("/", getAdoptions);
router.get("/:id", getAdoptionById);
router.post("/", createAdoption);
router.delete("/:id", deleteAdoption);

export default router;
