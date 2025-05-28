const express = require('express')
const app=express();
const cors=require('cors');
const cookieParser = require('cookie-parser');
const AuthRoute = require('./Route/AuthRoute');
const AdminProductRoute= require('./Route/Admin/ProductRoute');
const shopProductRoute = require('./Route/shop/productRoute');
const cartRoute= require('./Route/shop/cartRoute')
const addressRoute= require('./Route/shop/addressRoute')
const orderRoute= require('./Route/shop/orderRoute');
const AdminOrderRouter = require('./Route/Admin/orderRoute');
const searchRouter = require('./Route/shop/searchRoute');
const reviewRouter = require('./Route/shop/reviewRoute');
const featureRoute = require('./Route/featureRoute');

app.use(express.json())



app.use(cors({
    origin:process.env.CLIENT_BASE_URL,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],credentials:true
}))
app.use(cookieParser())
app.use('/api/auth',AuthRoute)
app.use('/api/admin/product',AdminProductRoute)
app.use('/api/admin/order',AdminOrderRouter)


app.use('/api/shop/product',shopProductRoute)
app.use('/api/shop/cart',cartRoute)
app.use('/api/shop/address',addressRoute)
app.use('/api/shop/order',orderRoute)
app.use('/api/shop/search',searchRouter)
app.use('/api/shop/review',reviewRouter)


app.use('/api/common/feature',featureRoute)




module.exports=app