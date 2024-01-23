import { MyCache } from "../App.js";
import { TryCatch } from "../Middlewares/Error.js";
import { calculatepercent } from "../Utils/Features.js";
import { Order } from "../model/Order.js";
import { Product } from "../model/Product.js";
import { User } from "../model/User.js";
export const AdminbashboardStats = TryCatch(async (req, res, next) => {
    let stats;
    if (MyCache.has("admin-stats"))
        stats = JSON.parse(MyCache.get("admin-stats"));
    else {
        const Today = new Date();
        const SixMonthPrev = new Date();
        SixMonthPrev.setMonth(SixMonthPrev.getMonth() - 6);
        const currentMonth = {
            start: new Date(Today.getFullYear(), Today.getMonth(), 1),
            end: Today,
        };
        const LastMonth = {
            start: new Date(Today.getFullYear(), Today.getMonth() - 1, 1),
            end: new Date(Today.getFullYear(), Today.getMonth(), 0),
        };
        const ThisMonthProductsPromise = Product.find({
            createdAt: {
                $gte: currentMonth.start,
                $lte: currentMonth.end,
            },
        });
        const LastMonthProductsPromise = Product.find({
            createdAt: {
                $gte: LastMonth.start,
                $lte: LastMonth.end,
            },
        });
        const ThisMonthUserPromise = User.find({
            createdAt: {
                $gte: currentMonth.start,
                $lte: currentMonth.end,
            },
        });
        const LastMonthUserPromise = User.find({
            createdAt: {
                $gte: LastMonth.start,
                $lte: LastMonth.end,
            },
        });
        const ThisMonthOrderPromise = Order.find({
            createdAt: {
                $gte: currentMonth.start,
                $lte: currentMonth.end,
            },
        });
        const LastMonthOrderPromise = Order.find({
            createdAt: {
                $gte: LastMonth.start,
                $lte: LastMonth.end,
            },
        });
        const SixMonthAgoOrderPromise = Order.find({
            createdAt: {
                $gte: SixMonthPrev,
                $lte: Today,
            },
        });
        const [ThisMonthUser, ThisMonthProducts, ThisMonthOrder, LastMonthUser, LastMonthProducts, LastMonthOrder, ProductsCount, UserCount, AllOrders, SixMonthAgoOrder,] = await Promise.all([
            ThisMonthUserPromise,
            ThisMonthProductsPromise,
            ThisMonthOrderPromise,
            LastMonthUserPromise,
            LastMonthProductsPromise,
            LastMonthOrderPromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total"),
            SixMonthAgoOrderPromise,
        ]);
        const thisMonthRevenue = ThisMonthOrder.reduce((total, order) => total + (order.total || 0), 0);
        const LastMonthRevenue = LastMonthOrder.reduce((total, order) => total + (order.total || 0), 0);
        const ChangePercent = {
            revenue: await calculatepercent(thisMonthRevenue, LastMonthRevenue),
            user: await calculatepercent(ThisMonthUser.length, LastMonthUser.length),
            product: await calculatepercent(ThisMonthProducts.length, LastMonthProducts.length),
            order: await calculatepercent(ThisMonthOrder.length, LastMonthOrder.length),
        };
        const Revenue = AllOrders.reduce((total, order) => total + (order.total || 0), 0);
        const Count = {
            user: UserCount,
            Product: ProductsCount,
            order: AllOrders.length,
            revenue: Revenue,
        };
        const OrderMonthCount = new Array(6).fill(0);
        const OrderMonthRevenue = new Array(6).fill(0);
        SixMonthAgoOrder.forEach((order) => {
            const creationdate = order.createdAt;
            const monthdiff = Today.getMonth() - creationdate.getMonth();
            if (monthdiff < 6) {
                OrderMonthCount[6 - monthdiff - 1] += 1;
                OrderMonthRevenue[6 - monthdiff - 1] += order.total;
            }
        });
        stats = {
            ChangePercent,
            Count,
            chart: {
                order: OrderMonthCount,
                Revenue: OrderMonthRevenue,
            },
        };
    }
    return res.status(200).json({
        success: true,
        stats,
    });
});
export const AdminbashboardPie = TryCatch(async (req, res, next) => { });
export const AdminbashboardBars = TryCatch(async (req, res, next) => { });
export const AdminbashboardLine = TryCatch(async (req, res, next) => { });
