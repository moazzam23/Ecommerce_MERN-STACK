import express from "express";
import UserRoutes from "./Routes/User.js";
import ProductRoutes from "./Routes/Product.js";
import { ConnectDB } from "./Utils/Features.js";
import { Errormiddleware } from "./Middlewares/Error.js";
import NodeCache from "node-cache";
export const MyCache = new NodeCache();
const app = express();
app.use(express.json({ limit: "50mb" }));
const port = 3000;
ConnectDB();
app.get("/", (req, res) => {
    res.send("working properly");
});
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/uploads", express.static("uploads"));
app.use(Errormiddleware);
app.listen(port, () => {
    console.log(`server is working on https:\\localhost:${port} `);
});
