import asyncHandler from "../middleware/catchAsyncErrors.js";
import Product from "../models/productModel.js";
import ApiFeature from "../utils/ApiFeature.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create Product -- Admin
export const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});
// Get ALl Products
export const getAllProducts = asyncHandler(async (req, res, next) => {
  // apifeature is instance of ApiFeature
  const apiFeature = new ApiFeature(Product.find(),req.query).search().filter();
  // console.log(apiFeature)
  const products = await apiFeature.query;

  //Response
  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product's Details
export const getProductDetails = asyncHandler(async (req, res, next) => {
  //find Product
  const product = await Product.findById(req.params.id);
  //check is Exist
  if (!product) return next(new ErrorHandler("Product not found", 404));
  //respone
  res.status(200).json({
    succes: true,
    product,
  });
});

// Update Products --Admin

export const updateProduct = asyncHandler(async (req, res, next) => {
  //check product exist
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //new:true :- return update Product

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- Admin
export const deleteProduct = asyncHandler(async (req, res, next) => {
  //find Product
  let product = await Product.findById(req.params.id);
  //check is Exist
  if (!product) return next(new ErrorHandler("Product not found", 404));
  //delete Product
  await product.remove();
  //respone
  res.status(200).json({
    succes: true,
    massage: "Product Deleted successfully",
  });
});
