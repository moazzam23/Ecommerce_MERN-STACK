import express from "express";
import { Allorder, DeleteOrder, GetOrderById, MyOrders, NewOrder, ProcessOrder } from "../Controller/Order.js";
import { Adminonly } from "../Middlewares/Auth.js";
const router = express.Router();
router.post("/new", NewOrder);
router.get("/my", MyOrders);
router.get("/all", Adminonly, Allorder);
router.route("/:id").get(GetOrderById).put(Adminonly, ProcessOrder).delete(Adminonly, DeleteOrder);
export default router;
