const express= require('express')
const { getAllOrderOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } = require('../../Controller/Admin/orderController')

const AdminOrderRouter= express.Router()

AdminOrderRouter.get('/list',getAllOrderOfAllUsers)
AdminOrderRouter.get('/details/:id',getOrderDetailsForAdmin)
AdminOrderRouter.put('/update/:id',updateOrderStatus)


module.exports=AdminOrderRouter


