import Product from "../models/productModel.js";

// Create Product -- Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
  }
};
// Get ALl Products
export const getAllProducts = async (req, res) => {
  //get all products
  const products = await Product.find();

  //Response
  res.status(200).json({
    success: true,
    products,
  });
};



// Get Product's Details 
export const getProductDetails = async (req, res,next) => {
  //find Product
  const product = await Product.findById(req.params.id);
  //check is Exist
  if (!product)
    res.status(500).json({ succes: false, massage: "Product does not Exist" });
  //respone
  res.status(200).json({
    succes: true,
    product
  });
};


// Update Products --Admin

export const updateProduct = async (req, res, next) => {
  //check product exist
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      massage: "Product Not Found",
    });
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
};

// Delete Product -- Admin
export const deleteProduct = async (req, res,next) => {
  //find Product
  let product = await Product.findById(req.params.id);
  //check is Exist
  if (!product)
    res.status(500).json({ succes: false, massage: "Product does not Exist" });
  //delete Product
  await product.remove();
  //respone
  res.status(200).json({
    succes: true,
    massage: "Product Deleted successfully",
  });
};
