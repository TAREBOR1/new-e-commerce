const Order = require("../../Model/Order")




const getAllOrderOfAllUsers=async(req,res)=>{
  try {
    const orders = await Order.find({}).sort({updatedAt:-1})
    if(!orders.length){
      return res.json({
        success:false,
        message:"No order found!"
      })
    }

    res.json({
      success:true,
      data:orders
    })
    
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}

const getOrderDetailsForAdmin=async(req,res)=>{
  try {
    const {id}=req.params
    const orders = await Order.findById(id).sort({updatedAt:-1})
    if(!orders){
      return res.json({
        success:false,
        message:"Order not found!"
      })
    }

    res.json({
      success:true,
      data:orders
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
}


const updateOrderStatus=async(req,res)=>{
    try {
        const {id}=req.params
        const {orderStatus}=req.body
        const order = await Order.findById(id)
        if(!order){
            return res.json({
              success:false,
              message:"Order not found!"
            })
          }

          await Order.findByIdAndUpdate(id,{orderStatus})

          return res.json({
            success:true,
            message:'Order status updated successfully'
          })

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
          });
    }
}


module.exports={getAllOrderOfAllUsers,getOrderDetailsForAdmin,updateOrderStatus}