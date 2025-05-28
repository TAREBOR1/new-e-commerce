const Order = require("../../Model/Order");
const Product = require("../../Model/Product");
const ProductReview = require("../../Model/Review");




const addProductReview=async(req,res)=>{
    try {
        const {    userId,
            productId,
            userName,
            reviewMessage,
            reviewValue} =req.body


const order = await Order.findOne({
    userId,
    "cartItem.productId":productId,
    orderStatus:'confirmed'
})

console.log(order)

if(!order){
    return res.json({
        success:false,
        message:'you need to purchase product to review it'
    })
}

const checkExistingReview = await ProductReview.findOne({productId,userId})

if(checkExistingReview){
    return res.json({
        success:false,
        message:'You already reviewed this product'
    })
}

const newReview = new ProductReview({
    userId,
    productId,
    userName,
    reviewMessage,
    reviewValue
})

console.log(' new reve',newReview)

await newReview.save();

const reviews = await ProductReview.find({
    productId
})
const totalReviewsLength= reviews.length
const averageReview= reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReviewsLength

await Product.findByIdAndUpdate(productId,{averageReview})


res.json({
    success:true,
     data:newReview
})


    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }
}

const getProductReviews=async(req,res)=>{
    try {

        const {productId}= req.params

        const reviews = await ProductReview.find({productId})

        res.json({
            success:true,
             data:reviews
        })

        
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }
}

module.exports={addProductReview,getProductReviews}