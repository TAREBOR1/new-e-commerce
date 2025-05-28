const express=require('express')
const { addToCart, getCart, updateCart, deleteCart } = require('../../Controller/Shop/cartController')

const cartRouter= express.Router()



cartRouter.post('/addCart',addToCart)
cartRouter.get('/getCart/:userId',getCart)
cartRouter.put('/updateCart',updateCart)
cartRouter.delete('/deleteCart/:userId/:productId',deleteCart)


module.exports =cartRouter