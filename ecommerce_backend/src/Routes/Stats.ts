import express from "express";
import {
  AdminbashboardBars,
  AdminbashboardLine,
  AdminbashboardPie,
  AdminbashboardStats,
} from "../Controller/Stats.js";
import { Adminonly } from "../Middlewares/Auth.js";

const router = express.Router();

router.get("/stats",Adminonly, AdminbashboardStats);

router.get("/pie", Adminonly, AdminbashboardPie);

router.get("/bar", Adminonly, AdminbashboardBars);

router.get("/line", Adminonly, AdminbashboardLine);

export default router;
