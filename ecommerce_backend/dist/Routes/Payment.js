import express from "express";
import { AllCoupons, ApplyDiscount, DeleteCoupons, NewCoupon } from "../Controller/Payment.js";
import { Adminonly } from "../Middlewares/Auth.js";
const router = express.Router();
router.post("/coupon/new", Adminonly, NewCoupon);
router.get("/discount", ApplyDiscount);
router.get("/coupon/all", Adminonly, AllCoupons);
router.delete("/coupon/:id", Adminonly, DeleteCoupons);
export default router;
