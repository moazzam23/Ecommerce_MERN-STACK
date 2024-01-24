import express from "express";
import UserRoutes from "./Routes/User.js";
import ProductRoutes from "./Routes/Product.js";
import OrderRoutes from "./Routes/Order.js";
import PaymentRoutes from "./Routes/Payment.js";
import StatsRoutes from "./Routes/Stats.js";
import { ConnectDB } from "./Utils/Features.js";
import { Errormiddleware } from "./Middlewares/Error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import stripe from "stripe";
config({
    path: "./.env"
});
const port = process.env.PORT || 3000;
const MongoDB = process.env.MONGO_URI || "";
const StripeKey = process.env.STRIPE_KEY || "";
ConnectDB(MongoDB);
export const MyCache = new NodeCache();
export const Stripe = new stripe(StripeKey);
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("working properly");
});
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/dashboard", StatsRoutes);
app.use("/uploads", express.static("uploads"));
app.use(Errormiddleware);
app.listen(port, () => {
    console.log(`server is working on https:\\localhost:${port} `);
});
