import { TryCatch } from "../Middlewares/Error.js";
import { Product } from "../model/Product.js";
import Errorhandler from "../Utils/Utilityclas.js";
import { rm } from "fs";
import { MyCache } from "../App.js";
// import {faker} from "@faker-js/faker"
export const Createproduct = TryCatch(async (req, res, next) => {
    const { name, price, category, stock } = req.body;
    const image = req.file;
    if (!image)
        return next(new Errorhandler("Add Photo", 400));
    if (!name || !price || !category || !stock) {
        rm(image.path, () => {
            console.log("deleted");
        });
        return next(new Errorhandler("All Fields are required", 400));
    }
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
});
export const Getlatestproduct = TryCatch(async (req, res, next) => {
    let product;
    if (MyCache.has("Latest-products"))
        product = JSON.parse(MyCache.get("Latest-products"));
    else {
        product = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        MyCache.set("Latest-products", JSON.stringify(product));
    }
    return res.status(200).json({
        success: true,
        product,
    });
});
export const Getproductcategory = TryCatch(async (req, res, next) => {
    let product;
    if (MyCache.has("Product-category"))
        product = JSON.parse(MyCache.get("Product-category"));
    else {
        product = await Product.distinct("category");
        MyCache.set("Product-category", JSON.stringify(product));
    }
    return res.status(200).json({
        success: true,
        product,
    });
});
export const GetAllproduct = TryCatch(async (req, res, next) => {
    let product;
    if (MyCache.has("ALL-products"))
        product = JSON.parse(MyCache.get("ALL-products"));
    else {
        product = await Product.find({});
        MyCache.set("ALL-products", JSON.stringify(product));
    }
    if (!product)
        return next(new Errorhandler("No product Found", 404));
    return res.status(200).json({
        success: true,
        product,
    });
});
export const Getproductbyid = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id;
    if (MyCache.has(`products- ${id}`))
        product = JSON.parse(MyCache.get(`products- ${id}`));
    else {
        product = await Product.findById(id);
        MyCache.set(`products- ${id}`, JSON.stringify(product));
    }
    if (!product)
        return next(new Errorhandler("No Product found", 404));
    return res.status(200).json({
        success: true,
        product,
    });
});
export const Deleteproduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new Errorhandler("No Product found", 404));
    rm(product.image, () => {
        console.log("deleted");
    });
    await product.deleteOne();
    return res.status(200).json({
        success: true,
        message: "product Deleted Successfully",
    });
});
export const updateproduct = TryCatch(async (req, res, next) => {
    // const {id} = req.params;
    const { name, price, category, stock } = req.body;
    const image = req.file;
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new Errorhandler("Product Not Found", 404));
    if (image) {
        rm(product.image, () => {
            console.log("deleted");
        });
        product.image = image.path;
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully"
    });
});
export const GetAllproductsearch = TryCatch(async (req, res, next) => {
    const { price, sort, category, search } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.Product_page) || 8;
    const skip = (page - 1) * limit;
    const Basequery = {};
    if (search)
        Basequery.name = {
            $regex: search,
            $options: "i"
        };
    if (price)
        Basequery.price = {
            $lte: Number(price)
        };
    if (category)
        Basequery.category = category;
    const [product, filterproduct] = await Promise.all([
        Product.find(Basequery).sort(sort && { price: sort === "asc" ? -1 : 1 }).limit(limit).skip(skip),
        Product.find(Basequery)
    ]);
    if (!product)
        return next(new Errorhandler("No product Found", 404));
    const totalpage = Math.ceil(filterproduct.length / limit);
    return res.status(200).json({
        success: true,
        product,
        totalpage
    });
});
//  export function createRandomrproducts():  {
//   return {
//     userId: faker.string.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// }
