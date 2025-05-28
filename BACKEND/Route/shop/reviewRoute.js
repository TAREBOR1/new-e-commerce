const express=require('express')

const { addProductReview, getProductReviews } = require('../../Controller/Shop/reviewController');

const reviewRouter= express.Router();



reviewRouter.post('/addReview',addProductReview)
reviewRouter.get('/getReview/:productId',getProductReviews)


module.exports=reviewRouter