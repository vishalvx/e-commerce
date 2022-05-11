//import model
import Product from "../models/productModel.js";
//utils
import ApiFeature from "../utils/ApiFeature.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create Product -- Admin
export const createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});
// Get ALl Products
export const getAllProducts = asyncHandler(async (req, res, next) => {
  const resultsPerPage = 10;
  const productCount = await Product.countDocuments();
  // apifeature is instance of ApiFeature
  const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  // console.log(apiFeature)
  const products = await apiFeature.query;

  //Response
  res.status(200).json({
    success: true,
    products,
    productCount,
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
