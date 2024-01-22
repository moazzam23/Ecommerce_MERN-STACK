import express from "express";
import { Allusers, Newuser, deleteUser, getUser } from "../Controller/User.js";
import { Adminonly } from "../Middlewares/Auth.js";

const app = express.Router();

app.post("/register",Newuser)

app.get("/all", Adminonly ,Allusers)

app.route("/:id").get(getUser).delete(Adminonly, deleteUser)

export default app;