const  express=require('express');
const {HandleImageUpload,AddProduct,GetProduct,UpdateProduct,DeleteProduct}=require('../../Controller/Admin/ProductController')
const {upload}=require('../../config/cloudinary')

const productRoute=express.Router()



productRoute.post('/uploadImage',upload.single('my_file'),HandleImageUpload)
productRoute.post('/addProduct',AddProduct)
productRoute.get('/getProduct',GetProduct)
productRoute.put('/updateProduct/:id',UpdateProduct)
productRoute.delete('/deleteProduct/:id',DeleteProduct)

module.exports=productRoute