const  express=require('express');
const { getFilteredProduct, getProductDetails } = require('../../Controller/Shop/productController');


const shopProductRoute=express.Router()





shopProductRoute.get('/getFilteredProduct',getFilteredProduct)
shopProductRoute.get('/getDetailedProduct/:id',getProductDetails)


module.exports=shopProductRoute