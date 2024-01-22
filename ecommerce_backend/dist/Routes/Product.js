import express from "express";
import { Adminonly } from "../Middlewares/Auth.js";
import { Singleupload } from "../Middlewares/Multer.js";
import { Createproduct, Deleteproduct, GetAllproduct, GetAllproductsearch, Getlatestproduct, Getproductbyid, Getproductcategory, updateproduct, } from "../Controller/Product.js";
const router = express.Router();
router.post("/createproduct", Adminonly, Singleupload, Createproduct);
router.get("/latest", Getlatestproduct);
router.get("/allproduct", GetAllproductsearch);
router.get("/categories", Getproductcategory);
router.get("/adminproduct", Adminonly, GetAllproduct);
router
    .route("/:id")
    .get(Getproductbyid)
    .put(Adminonly, Singleupload, updateproduct)
    .delete(Adminonly, Deleteproduct);
export default router;
