
const express= require('express')
const { addAddress, updateAddress, deleteAddress, getAddress } = require('../../Controller/Shop/addressController')
const addressRouter= express.Router()

addressRouter.post('/addAddress',addAddress)
addressRouter.put('/updateAddress/:userId/:addressId',updateAddress)
addressRouter.delete('/deleteAddress/:userId/:addressId',deleteAddress)
addressRouter.get('/getAddress/:userId',getAddress)


module.exports =addressRouter