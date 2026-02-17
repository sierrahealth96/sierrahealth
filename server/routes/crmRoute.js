import express from "express";
import { getCrmStats } from "../controllers/crmController.js";

const router = express.Router();

router.get("/crm/admin", getCrmStats);

export default router;