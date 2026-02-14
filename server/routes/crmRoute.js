import express from "express";
import { getCrmStats } from "../controllers/crmController.js";

const router = express.Router();

router.get("/", getCrmStats);

export default router;