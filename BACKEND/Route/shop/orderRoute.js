const express= require('express')
const { createOrder, capturePayment,getAllOrderByUser,getOrderDetails } = require('../../Controller/Shop/orderController')

const orderRouter= express.Router()



orderRouter.post('/createOrder',createOrder)
orderRouter.post('/captureOrder',capturePayment)
orderRouter.get('/list/:userId',getAllOrderByUser)
orderRouter.get('/details/:id',getOrderDetails)

module.exports=orderRouter