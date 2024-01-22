import express from "express";
import { Singleupload } from "../Middlewares/Multer.js";
import { Createproduct, Deleteproduct, GetAllproduct, Getlatestproduct, Getproductbyid, Getproductcategory, updateproduct, } from "../Controller/Product.js";
const router = express.Router();
router.post("/createproduct", Singleupload, Createproduct);
router.get("/latest", Getlatestproduct);
router.get("/categories", Getproductcategory);
router.get("/adminproduct", GetAllproduct);
router
    .route("/:id")
    .get(Getproductbyid)
    .put(updateproduct)
    .delete(Deleteproduct);
export default router;
