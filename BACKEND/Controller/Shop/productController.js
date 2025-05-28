const Product = require("../../Model/Product")




const getFilteredProduct=async(req,res)=>{
    try {
        const { category='',brand='',sortBy='price-lowtohigh'}=req.query

        let filters={}

        if(category.length){
            filters.category={$in:category.split(',')}
        };
        if(brand.length){
            filters.brand={$in:brand.split(',')}
        };
        let sort={}
        switch (sortBy) {
            case "price-lowtohigh":
                   sort.price=1
                break;
            case "price-hightolow":
                   sort.price=-1
                break;
            case "title-atoz":
                   sort.title=1
                break;
            case "title-ztoa":
                   sort.title=-1
                break;
        
            default:
                sort.price=1
                break;
        }

        const Products = await Product.find(filters).sort(sort)
        res.json({
            success: true,
            data:Products,
          });
        
    } catch (error) {
       res.json({
        message:error.message,
        success:false
       }) 
    }
}
const getProductDetails=async(req,res)=>{
    try {
        const {id}=req.params
        const product= await Product.findById(id)
        if(!product){
           return res.json({
                success:false,
                message:"product  not found"
            })
        }else{
            return res.json({
                success:true,
                 data:product
            }) 
        }
    } catch (error) {
        res.json({
            message:error.message,
            success:false
           }) 
    }
}

module.exports={getFilteredProduct,getProductDetails}