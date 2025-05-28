const { Cart } = require("../../Model/Cart")
const Product = require("../../Model/Product")




const addToCart= async(req,res)=>{
    try {

      const  {userId,productId,quantity}=req.body
      if(!userId || !productId || quantity <= 0){
       return res.json({
            success:false,
            message:'invalid data  provided'
        })
      }
        
const product = await Product.findById(productId)
if(!product){
    res.json({
        success:false,
        message:'product not found'
    })
}
let cart = await Cart.findOne({userId})
if(!cart){
    cart= new Cart({
        userId,
        items:[]
    })
}

const findCurrentProductIndex= cart.items.findIndex(item=>item.productId.toString()===productId)

if(findCurrentProductIndex===-1){
    cart.items.push({productId,quantity})
}else{
    cart.items[findCurrentProductIndex].quantity +=quantity
}

await  cart.save()

res.json({
    success:true,
    data:cart
})

    } catch (error) {
        res.json({
            message:error.message,
            success:false
           }) 
    }
}
const getCart= async(req,res)=>{
    try {
        const {userId}=req.params
        if(!userId){
            return res.json({
                success:false,
                message:'user Id is mandatory'
            })
        }

        const cart = await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:'image title price salePrice'
        })

        if(!cart){
            return res.json({
                success:false,
                message:'cart not found'
            }) 
        }

        const validItems = cart.items.filter(productItems=>productItems.productId)
        if(validItems.length < cart.items.length){
            cart.items= validItems
            await cart.save()
        }
        const populateCartItem = validItems.map((item)=>({
           productId:item.productId._id,
           image:item.productId.image,
           title:item.productId.title,
           price:item.productId.price,
           salePrice:item.productId.salePrice,
           quantity:item.quantity,
        }))

        res.json({
            success:true,
            data:{
                ...cart._doc,
                items:populateCartItem
            }
        })
        
    } catch (error) {
        res.json({
            message:error.message,
            success:false
           }) 
    }
}
const updateCart= async(req,res)=>{
    try {
        const  {userId,productId,quantity}=req.body
        if(!userId || !productId || quantity <= 0){
         return res.json({
              success:false,
              message:'invalid data  provided'
          })
        }

        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.json({
                success:false,
                message:'cart not found'
            }) 
        }
  const findCurrentProductIndex= cart.items.findIndex(items=>items.productId.toString()===productId)
  if(findCurrentProductIndex===-1){
    return res.json({
        success:false,
        message:'cart item not present!'
    })
  }
  cart.items[findCurrentProductIndex].quantity = quantity
  await cart.save();

  await cart.populate({
    path:'items.productId',
    select:'image title price salePrice'
  })

  const populateCartItem = cart.items.map((item)=>({
    productId: item.productId? item.productId._id : null,
    image: item.productId?item.productId.image :null,
    title:item.productId? item.productId.title: "product not found",
    price:item.productId? item.productId.price : null,
    salePrice:item.productId? item.productId.salePrice:null,
    quantity:item.quantity,
 }))

 res.json({
     success:true,
     data:{
         ...cart._doc,
         items:populateCartItem
     }
 })
        
    } catch (error) {
        res.json({
            message:error.message,
            success:false
           }) 
    }
}
const deleteCart= async(req,res)=>{
    try {
        const  {userId,productId}=req.params
        if(!userId || !productId ){
            return res.json({
                 success:false,
                 message:'invalid data  provided'
             })
           }


           const cart = await Cart.findOne({userId}).populate({
            path:'items.productId',
            select:'image title price salePrice'
          })
          if(!cart){
            return res.json({
                success:false,
                message:'cart not found'
            }) 
        }


         cart.items = cart.items.filter(productItems=>productItems.productId._id.toString()!==productId)

         await cart.save();

         await cart.populate({
            path:'items.productId',
            select:'image title price salePrice'
          })


          const populateCartItem = cart.items.map((item)=>({
            productId: item.productId? item.productId._id : null,
            image:item.productId?item.productId.image :null,
            title:item.productId? item.productId.title: "product not found",
            price:item.productId? item.productId.price : null,
            salePrice:item.productId?item.productId.salePrice:null,
            quantity:item.quantity,
         }))
        
         res.json({
             success:true,
             data:{
                 ...cart._doc,
                 items:populateCartItem
             }
         })


    } catch (error) {
        res.json({
            message:error.message,
            success:false
           }) 
    }
}


module.exports ={addToCart,getCart,updateCart,deleteCart}