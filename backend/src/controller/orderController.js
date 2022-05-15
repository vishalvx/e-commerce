//import model
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
//utils
import ApiFeature from "../utils/ApiFeature.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//create new Order
export const createOrder = asyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderInfo,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //add new order
  const order = await Order.create({
    shippingInfo,
    orderInfo,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });
  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order --Admin
export const getSingleOrder = asyncHandler(async (req, res, next) => {
  /**
   * populate use for replace the value of user with their other data
   * from User Collation
   * here i change user id to with name and email
   */
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found on this is ID", 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

//get my Orders
export const myOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json({
    success: true,
    orders,
  });
});

//get All Orders
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("No order found on this is ID", 404));
  }

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update Order status --Admin
export const updateOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order product not exist", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is Already Delivered", 401));
  }
  order.orderInfo.forEach(async (order) => {
    await updateStocks(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  //update to product Stock
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    order,
  });
});

//update stocks fn
const updateStocks = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
};
//delete order
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found on this is ID", 404));
  }

  await order.remove();

  res.status(201).json({
    success: true,
  });
});
