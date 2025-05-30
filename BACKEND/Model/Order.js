const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId:String,
    cartItem:[
        {productId:String,
            title:String,
            image:String,
            price:String,
            quantity:Number
        }
    ],
    addressInfo:{
        addressId:String,
        address:String,
        city:String,
        phone:String,
        pincode:String,
        notes:String
    },
    orderStatus:String,
    paymentMethod:String,
    paymentStatus:String,
    totalAmount:Number,
    orderDate:Date,
    orderUpdateDate:Date,
    paymentId:String,
    payerId:String

},{ timestamps: true })

const Order = mongoose.model('Order',OrderSchema)

module.exports = Order