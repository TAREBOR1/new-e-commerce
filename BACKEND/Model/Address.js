const mongoose = require('mongoose')

const AddressSchema= new mongoose.Schema({
   userId:String,
   address:String,
   phone:String,
   pincode:String,
   city:String,
   notes:String
},{timestamps:true})

const Address = mongoose.model('Address',AddressSchema)

module.exports = {Address}