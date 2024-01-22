import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../Middlewares/Error.js";
import { NewProductgData } from "../Types/Types.js";
import { Product } from "../model/Product.js";
import Errorhandler from "../Utils/Utilityclas.js";
import { rm } from "fs";

export const Createproduct = TryCatch(
  async (
    req: Request<{}, {}, NewProductgData>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, price, category, stock } = req.body;
    const image = req.file;

    if(!image) return next( new Errorhandler("Add Photo",400))

    if (!name || !price || !category || !stock ){

        rm(image.path,()=>{
console.log("deleted")
        })

      return next(new Errorhandler("All Fields are required", 400));}

    const product = await Product.create({
      name,
      price,
      category: category.toLowerCase(),
      stock,
      image: image.path,
    });

    return res.status(200).json({
      success: true,
      product,
      message: "Product Created",
    });
  }
);


export  const Getlatestproduct = TryCatch(async(req,res,next)=>{
   
   const product = await Product.find({}).sort({createdAt:-1}).limit(5)
   

    return res.status(200).json({
        success: true,
        product,
      });
})

export  const Getproductcategory = TryCatch(async(req,res,next)=>{
   
    const product = await Product.distinct("category")
 
     return res.status(200).json({
         success: true,
         product,
       });
 })

 export  const GetAllproduct = TryCatch(async(req,res,next)=>{
   
    const product = await Product.find({})

    if(!product) return next(new Errorhandler("No product Found", 404))
 
     return res.status(200).json({
         success: true,
         product,
       });
 })

 export  const Getproductbyid = TryCatch(async(req,res,next)=>{
   
    const product = await Product.findById(req.params.id)

    if(!product) return next(new Errorhandler("No Product found", 404))
 
     return res.status(200).json({
         success: true,
         product,
       });
 })
 export  const Deleteproduct = TryCatch(async(req,res,next)=>{
   
    const product = await Product.findById(req.params.id)

    if(!product) return next(new Errorhandler("No Product found", 404))

    rm(product.image,()=>{
        console.log("deleted")
                })

    await product.deleteOne();
 
     return res.status(200).json({
         success: true,
         message:"product Deleted Successfully",
       });
 })

 export const updateproduct = TryCatch(
    async (
      req,
      res ,
      next
    ) => {


        // const {id} = req.params;
      const { name, price, category, stock } = req.body;
      const image = req.file;

      const product= await Product.findById(req.params.id);

if(!product) return next(new Errorhandler("Product Not Found", 404))
  
      if (image){
          rm(product.image,()=>{
  console.log("deleted")
          })

          product.image=image.path;}
  
          if (name) product.name=name;
          if (price) product.price=price;
          if (stock) product.stock=stock;
          if (category) product.category=category;
  
      await product.save();
  
      return res.status(200).json({
        success: true,
        message:"Product Updated Successfully"
      });
    }
  );