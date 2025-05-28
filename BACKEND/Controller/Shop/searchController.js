const Product = require("../../Model/Product");

  


  const searchProduct =async(req,res)=>{
    try {
        const {keyword}=req.params
        if(!keyword || typeof keyword !== 'string'){
            return res.json({
                success:false,
                message:'key word is required and must be in string format'
            })
        }
        const regEx= new RegExp(keyword,'i')
        const createSearchQuery ={
            $or : [
                {title:regEx},
                {description:regEx},
                {category:regEx},
                {brand:regEx}
            ]
        }
        const searchResults = await Product.find(createSearchQuery)

        return res.json({
            success:true,
            data:searchResults
        })
    } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
  }



  module.exports={searchProduct};