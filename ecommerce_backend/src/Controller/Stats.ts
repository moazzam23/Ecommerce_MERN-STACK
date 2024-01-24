import { MyCache } from "../App.js";
import { TryCatch } from "../Middlewares/Error.js";
import {
  DiffCalculator,
  GetProductCategory,
  calculatepercent,
} from "../Utils/Features.js";
import { Order } from "../model/Order.js";
import { Product } from "../model/Product.js";
import { User } from "../model/User.js";

export const AdminbashboardStats = TryCatch(async (req, res, next) => {
  let stats;

  if (MyCache.has("admin-stats"))
    stats = JSON.parse(MyCache.get("admin-stats") as string);
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

    const LatestTransactionPromise = Order.find({})
      .select(["discount", "status", "_id", "total", "orderItems"])
      .limit(4);

    const [
      ThisMonthUser,
      ThisMonthProducts,
      ThisMonthOrder,
      LastMonthUser,
      LastMonthProducts,
      LastMonthOrder,
      ProductsCount,
      UserCount,
      AllOrders,
      SixMonthAgoOrder,
      ProductCategories,
      FemaleUserCount,
      LatestTransaction,
    ] = await Promise.all([
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
      Product.distinct("category"),
      User.countDocuments({ gender: "female" }),
      LatestTransactionPromise,
    ]);

    const Modifiedlatedtransaction = LatestTransaction.map((i) => ({
      _id: i._id,
      status: i.status,
      discount: i.discount,
      amount: i.total,
      quantity: i.orderItems.length,
    }));

    const thisMonthRevenue = ThisMonthOrder.reduce(
      (total, order) => total + (order.total || 0),
      0
    );
    const LastMonthRevenue = LastMonthOrder.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

    const ChangePercent = {
      revenue: await calculatepercent(thisMonthRevenue, LastMonthRevenue),
      user: await calculatepercent(ThisMonthUser.length, LastMonthUser.length),
      product: await calculatepercent(
        ThisMonthProducts.length,
        LastMonthProducts.length
      ),
      order: await calculatepercent(
        ThisMonthOrder.length,
        LastMonthOrder.length
      ),
    };

    const Revenue = AllOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );

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
      const monthdiff = (Today.getMonth() - creationdate.getMonth() / 12) % 12;

      if (monthdiff < 6) {
        OrderMonthCount[6 - monthdiff - 1] += 1;
        OrderMonthRevenue[6 - monthdiff - 1] += order.total;
      }
    });

    const CategoryCount: Record<string, number>[] = await GetProductCategory({
      ProductCategories,
      ProductsCount,
    });

    const UserRatio = {
      male: UserCount - FemaleUserCount,
      female: FemaleUserCount,
    };

    stats = {
      CategoryCount,
      ChangePercent,
      Count,
      chart: {
        order: OrderMonthCount,
        Revenue: OrderMonthRevenue,
      },
      UserRatio,
      LatestTransaction: Modifiedlatedtransaction,
    };
    MyCache.set("admin-stats", JSON.stringify(stats));
  }
  return res.status(200).json({
    success: true,
    stats,
  });
});

export const AdminbashboardPie = TryCatch(async (req, res, next) => {
  let piechart;

  if (MyCache.has("admin-pie-chart"))
    piechart = JSON.parse(MyCache.get("admin-pie-chart") as string);
  else {
    const [
      OrderProcessing,
      OrderShipped,
      OrderDelivered,
      ProductCategories,
      ProductsCount,
      productOutStock,
      Allorders,
      AllUsers,
      CustomerUser,
      AdminUser,
    ] = await Promise.all([
      Order.countDocuments({ status: "processing" }),
      Order.countDocuments({ status: "Shipped" }),
      Order.countDocuments({ status: "Delivered" }),
      Product.distinct("category"),
      Product.countDocuments(),
      Product.countDocuments({ stock: 0 }),
      Order.find({}).select([
        "discount",
        "total",
        "subtotal",
        "shippingcharges",
        "tax",
      ]),
      User.find({}).select(["dob"]),
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "admin" }),
    ]);

    const Orderfullfillment = {
      Processed: OrderProcessing,
      Shipped: OrderShipped,
      Delivered: OrderDelivered,
    };

    const CategoryCount: Record<string, number>[] = await GetProductCategory({
      ProductCategories,
      ProductsCount,
    });

    const StockAvaliability = {
      totalstock: ProductsCount - productOutStock,
      outstock: productOutStock,
    };

    const grossincome = Allorders.reduce(
      (prev, order) => prev + (order.total || 0),
      0
    );
    const Discount = Allorders.reduce(
      (prev, order) => prev + (order.discount || 0),
      0
    );
    const ProductionCost = Allorders.reduce(
      (prev, order) => prev + (order.shippingcharges || 0),
      0
    );
    const burnt = Allorders.reduce((prev, order) => prev + (order.tax || 0), 0);
    const marketingCost = Math.round(grossincome * (30 / 100));
    const netmargin =
      grossincome - Discount - ProductionCost - burnt - marketingCost;

    const RevenueDistribution = {
      netmargin,
      Discount,
      ProductionCost,
      burnt,
      marketingCost,
    };

    const AdminBlock = {
      admin: AdminUser,
      customer: CustomerUser,
    };

    const UserAgeGroup = {
      teen: AllUsers.filter((i) => i.age < 20).length,
      adult: AllUsers.filter((i) => i.age >= 20 && i.age < 40).length,
      old: AllUsers.filter((i) => i.age >= 40).length,
    };

    piechart = {
      Orderfullfillment,
      CategoryCount,
      StockAvaliability,
      RevenueDistribution,
      UserAgeGroup,
      AdminBlock,
    };

    MyCache.set("admin-pie-chart", JSON.stringify(piechart));
  }

  return res.status(200).json({
    success: true,
    piechart,
  });
});

export const AdminbashboardBars = TryCatch(async (req, res, next) => {
  let barchart;

  if (MyCache.has("admin-bar-chart"))
    barchart = JSON.parse(MyCache.get("admin-bar-chart") as string);
  else {
    const Today = new Date();

    const SixMonthPrev = new Date();
    SixMonthPrev.setMonth(SixMonthPrev.getMonth() - 6);

    const twelveMonthPrev = new Date();
    twelveMonthPrev.setMonth(twelveMonthPrev.getMonth() - 12);

    const TwelveMonthAgoOrderPromise = Order.find({
      createdAt: {
        $gte: twelveMonthPrev,
        $lte: Today,
      },
    }).select("createdAt");

    const SixMonthAgouserPromise = User.find({
      createdAt: {
        $gte: SixMonthPrev,
        $lte: Today,
      },
    }).select("createdAt");

    const SixMonthAgoProductPromise = Product.find({
      createdAt: {
        $gte: SixMonthPrev,
        $lte: Today,
      },
    }).select("createdAt");

    const [TwelveMonthOrder, SixMonthProduct, SixMonthUser] = await Promise.all(
      [
        TwelveMonthAgoOrderPromise,
        SixMonthAgoProductPromise,
        SixMonthAgouserPromise,
      ]
    );

    const ProductMonth = await DiffCalculator({
      length: 6,
      DocArr: SixMonthProduct,
      Today,
    });
    const UserMonth = await DiffCalculator({
      length: 6,
      Today,
      DocArr: SixMonthUser,
    });
    const OrderMonth = await DiffCalculator({
      length: 12,
      DocArr: TwelveMonthOrder,
      Today,
    });

    barchart = {
      product: ProductMonth,
      user: UserMonth,
      order: OrderMonth,
    };

    MyCache.set("admin-bar-chart", JSON.stringify(barchart));
  }

  return res.status(200).json({
    success: true,
    barchart,
  });
});

export const AdminbashboardLine = TryCatch(async (req, res, next) => {
  let linechart;

  if (MyCache.has("admin-line-chart"))
    linechart = JSON.parse(MyCache.get("admin-line-chart") as string);
  else {
    const Today = new Date();

    const twelveMonthPrev = new Date();
    twelveMonthPrev.setMonth(twelveMonthPrev.getMonth() - 12);

    const TwelveMonthAgoOrderPromise = Order.find({
      createdAt: {
        $gte: twelveMonthPrev,
        $lte: Today,
      },
    }).select(["createdAt","discount","total"]);

    const TwelveMonthAgouserPromise = User.find({
      createdAt: {
        $gte: twelveMonthPrev,
        $lte: Today,
      },
    }).select("createdAt");

    const TwelveMonthAgoProductPromise = Product.find({
      createdAt: {
        $gte: twelveMonthPrev,
        $lte: Today,
      },
    }).select("createdAt");

    const [TwelveMonthOrder, TwevlveMonthProduct, TwelveMonthUser] =
      await Promise.all([
        TwelveMonthAgoOrderPromise,
        TwelveMonthAgoProductPromise,
        TwelveMonthAgouserPromise,
      ]);

    const ProductMonth = await DiffCalculator({
      length: 12,
      DocArr: TwevlveMonthProduct,
      Today,
    });
    const UserMonth = await DiffCalculator({
      length: 12,
      Today,
      DocArr: TwelveMonthUser,
    });
    const discount = await DiffCalculator({
      length: 12,
      DocArr: TwelveMonthOrder,
      Today,
      property:"discount",
    });
    const revenue = await DiffCalculator({
      length: 12,
      DocArr: TwelveMonthOrder,
      Today,
      property:"total",
    });

    linechart = {
      product: ProductMonth,
      user: UserMonth,
      discount: discount,
      revenue: revenue,
    };

    MyCache.set("admin-line-chart", JSON.stringify(linechart));
  }

  return res.status(200).json({
    success: true,
    linechart,
  });
});
