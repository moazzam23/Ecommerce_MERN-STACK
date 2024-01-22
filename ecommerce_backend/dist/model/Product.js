import mongoose from "mongoose";
const Productschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Product Name"]
    },
    image: {
        type: String,
        required: [true, "Please add Photo"]
    },
    price: {
        type: Number,
        required: [true, "Enter Product Price"]
    },
    stock: {
        type: Number,
        required: [true, "Enter the stock avaliable"]
    },
    category: {
        type: String,
        required: [true, "Enter the product category"],
        trim: true,
    }
}, {
    timestamps: true,
});
export const Product = mongoose.model(" Product", Productschema);
