import mongoose from "mongoose";


const couponschema = new mongoose.Schema({
    code:{
        type:String,
        required:[true,"Enter the Coupon Code"],
    unique:true,
    },
    amount:{
        type:Number,
        required:[true,"Enter the Discount Amount"],
    }
})

export const Coupon = mongoose.model("Coupon", couponschema)