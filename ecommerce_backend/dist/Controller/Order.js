import { TryCatch } from "../Middlewares/Error.js";
import { Order } from "../model/Order.js";
import { ReduceStock, revalidateCaches } from "../Utils/Features.js";
import Errorhandler from "../Utils/Utilityclas.js";
import { MyCache } from "../App.js";
export const NewOrder = TryCatch(async (req, res, next) => {
    const { shippingInfo, orderItems, user, tax, total, discount, shippingcharges, subtotal, } = req.body;
    if (!shippingInfo || !orderItems || !tax || !user || !subtotal || !total)
        return next(new Errorhandler("Fill All Fields", 400));
    await Order.create({
        shippingInfo,
        orderItems,
        user,
        tax,
        total,
        discount,
        shippingcharges,
        subtotal,
    });
    await ReduceStock(orderItems);
    await revalidateCaches({ product: true, admin: true, order: true, userID: user });
    return res.status(201).json({
        success: true,
        message: "Order Placed Successfully"
    });
});
export const MyOrders = TryCatch(async (req, res, next) => {
    const { id: user } = req.query;
    let orders = [];
    if (MyCache.has(`myorder-${user}`))
        orders = JSON.parse(MyCache.get(`myorder-${user}`));
    else {
        orders = await Order.find({ user });
        MyCache.set(`myorder-${user}`, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const Allorder = TryCatch(async (req, res, next) => {
    let orders = [];
    if (MyCache.has("All-order"))
        orders = JSON.parse(MyCache.get("All-order"));
    else {
        orders = await Order.find().populate("user", "name");
        MyCache.set("All-order", JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const GetOrderById = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const key = `Order-${id}`;
    let orders;
    if (MyCache.has(key))
        orders = JSON.parse(MyCache.get(key));
    else {
        orders = await Order.findById(id).populate("user", "name");
        if (!orders)
            return next(new Errorhandler("Order Not Found", 404));
        MyCache.set(key, JSON.stringify(orders));
    }
    return res.status(200).json({
        success: true,
        orders,
    });
});
export const ProcessOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const orders = await Order.findById(id);
    if (!orders)
        return next(new Errorhandler("Order Not Found", 404));
    switch (orders.status) {
        case "processing":
            orders.status = "Shipped";
            break;
        case "Shipped":
            orders.status = "Delivered";
            break;
        default:
            orders.status = "Delivered";
            break;
    }
    await orders.save();
    await revalidateCaches({ product: false, admin: true, order: true, userID: orders.user });
    return res.status(201).json({
        success: true,
        message: "Order Updated Successfully"
    });
});
export const DeleteOrder = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const orders = await Order.findById(id);
    if (!orders)
        return next(new Errorhandler("Order Not Found", 404));
    await orders.deleteOne();
    await revalidateCaches({ product: false, admin: true, order: true, userID: orders.user });
    return res.status(201).json({
        success: true,
        message: "Order Deleted Successfully"
    });
});
