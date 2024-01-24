import { Stripe } from "../App.js";
import { TryCatch } from "../Middlewares/Error.js";
import Errorhandler from "../Utils/Utilityclas.js";
import { Coupon } from "../model/Coupon.js";

export const NewPayment = TryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) return next(new Errorhandler("Please Enter Amount", 400));

  const Payment = await Stripe.paymentIntents.create({
    amount: Number(amount)*100,
    currency: "pkr",
  });

  return res.status(200).json({
    success:true,
    clinetSecret: Payment.client_secret,
  })
});

export const NewCoupon = TryCatch(async (req, res, next) => {
  const { code, amount } = req.body;

  if (!code || !amount)
    return next(new Errorhandler("please enter all fields", 400));

  await Coupon.create({ code, amount });

  return res.status(200).json({
    success: true,
    message: "Coupon Code Created",
  });
});

export const ApplyDiscount = TryCatch(async (req, res, next) => {
  const { code } = req.query;

  const discount = await Coupon.findOne({ code: code });

  if (!discount) return next(new Errorhandler("Invalid Coupon Code", 400));

  return res.status(200).json({
    success: true,
    discount: discount.amount,
  });
});

export const AllCoupons = TryCatch(async (req, res, next) => {
  const coupons = await Coupon.find({});

  return res.status(200).json({
    success: true,
    coupons,
  });
});

export const DeleteCoupons = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const coupons = await Coupon.findByIdAndDelete(id);

  if (!coupons) return next(new Errorhandler("Invalid Coupon ID", 404));

  return res.status(200).json({
    success: true,
    message: `Coupon ${coupons.code} Deleted Successfully`,
  });
});
