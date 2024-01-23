import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
    },
    user: {
        type: String,
        ref: "User"
    },
    tax: {
        type: Number,
        required: true,
    },
    shippingcharges: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["processing", "Shipped", "Delivered"],
        default: "processing",
    },
    orderItems: [{
            name: String,
            image: String,
            price: Number,
            quantity: Number,
            productID: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }
        }]
}, {
    timestamps: true,
});
export const Order = mongoose.model(" Order", OrderSchema);
