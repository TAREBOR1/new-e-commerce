const { ImageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../Model/Product");

const HandleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await ImageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const AddProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  try {
    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !salePrice ||
      !totalStock
    ) {
      return res.json({
        success: false,
        message: "details must be filled",
      });
    }
    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();

    res.json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const GetProduct = async (req, res) => {
  try {
    const ListOfProduct = await Product.find({});
    res.json({
      success: true,
      data: ListOfProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  
  try {
    let findProduct= await Product.findById(id)
    if(!findProduct){
        return res.json({
            success:false,
            message:"product not found"
        })
    }
    findProduct.title=title || findProduct.title
    findProduct.image=image || findProduct.image
    findProduct.description=description|| findProduct.description
    findProduct.category=category || findProduct.category
    findProduct.brand= brand|| findProduct.brand
    findProduct.price= price ===''?0 :price || findProduct.price
    findProduct.salePrice= salePrice===""?0:salePrice || findProduct.salePrice
    findProduct.totalStock=totalStock || findProduct.totalStock

    await findProduct.save()

    res.json({
        success:true,
        message:'Product Updated Successfully',
        data:findProduct
    }
    )
  

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const DeleteProduct = async (req, res) => {
    const { id } = req.params;
    const product= await Product.findByIdAndDelete(id)
    if(!product){
        return res.json({
            success:false,
            message:"product not found"
        })
    }
    res.json({
        success:true,
        message:"Product Deleted Successfully"
    })
  try {
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  HandleImageUpload,
  AddProduct,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
};
