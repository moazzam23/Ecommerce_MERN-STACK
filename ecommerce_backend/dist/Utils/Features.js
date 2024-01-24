import mongoose from "mongoose";
import { MyCache } from "../App.js";
import { Product } from "../model/Product.js";
import { Order } from "../model/Order.js";
export const ConnectDB = (URI) => {
    mongoose.connect(URI, {
        dbName: "Ecommerce_App",
    })
        .then(() => {
        console.log(`DB is connected to ${mongoose.connection.host}`);
    })
        .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
};
export const revalidateCaches = async ({ product, order, admin, userID }) => {
    if (product) {
        const revalidateprop = ["product-category", "All-product", "Latest-products"];
        const product = await Product.find({}).select("_id");
        product.forEach((i) => {
            revalidateprop.push(`products- ${i._id}`);
        });
        MyCache.del(revalidateprop);
    }
    if (order) {
        const orderkey = ["All-order", `myorder-${userID}`];
        const order = await Order.find({}).select("_id");
        order.forEach((i) => {
            orderkey.push(`Order-${i._id}`);
        });
        MyCache.del(orderkey);
    }
    if (admin) {
        MyCache.del(["admin-stats", "admin-pie-chart", "admin-bar-chart", "admin-line-chart"]);
    }
};
export const ReduceStock = async (order) => {
    for (let i = 0; i < order.length; i++) {
        const Order = order[i];
        const product = await Product.findById(Order.productID);
        if (!product)
            throw new Error("Product Not Found");
        product.stock -= Order.quantity;
        await product.save();
    }
};
export const calculatepercent = async (thisMonth, LastMonth) => {
    if (LastMonth === 0)
        return thisMonth * 100;
    const percentage = ((thisMonth) / LastMonth) * 100;
    return Number(percentage.toFixed(0));
};
export const GetProductCategory = async ({ ProductCategories, ProductsCount }) => {
    const productcategoryPromise = ProductCategories.map((category) => Product.countDocuments({ category }));
    const productCategoryCount = await Promise.all(productcategoryPromise);
    const CategoryCount = [];
    ProductCategories.forEach((category, i) => {
        CategoryCount.push({
            [category]: Math.round((productCategoryCount[i] / ProductsCount) * 100)
        });
    });
    return CategoryCount;
};
export const DiffCalculator = async ({ length, DocArr, Today, property }) => {
    const Data = new Array(length).fill(0);
    DocArr.forEach((i) => {
        const creationdate = i.createdAt;
        const monthdiff = (Today.getMonth() - creationdate.getMonth() / 12) % 12;
        if (monthdiff < length) {
            if (property) {
                Data[length - monthdiff - 1] += i[property];
            }
            else {
                Data[length - monthdiff - 1] += 1;
            }
        }
    });
    return Data;
};
