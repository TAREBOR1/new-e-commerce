const express=require('express')
const { searchProduct ,testSearch} = require('../../Controller/Shop/searchController')

const searchRouter= express.Router();

searchRouter.get('/:keyword',searchProduct)



module.exports=searchRouter