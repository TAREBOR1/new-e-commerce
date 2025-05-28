const paypal = require ('../../config/paypal');
const { Cart } = require('../../Model/Cart');
const Order = require('../../Model/Order');
const Product = require('../../Model/Product');


const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartId,
      cartItem,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;


 

    const create_payment_json={
      intent:'sale',
      payer:{
        payment_method:'paypal'
      },
      redirect_urls:{
        return_url:`${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
        cancel_url:`${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`
      },
      transactions:[
        {
          item_list:{
            items:cartItem.map((item)=>{
              return { 
                name: item.title,
                sku:item.productId,
                price:item.price.toFixed(2),
                currency:"USD",
                quantity:item.quantity
              }          
            })
          },
          amount:{
            currency:"USD",
            total:totalAmount.toFixed(2)
            },
            description:'description'
        }
      ]
    }

paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
    if(error){
      console.log(error)
      return res.json({
        success:false,
        message:"error while creating paypal payment"
      })
    }else{
      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItem,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
      })

      await newlyCreatedOrder.save()

      const approvalUrl= paymentInfo.links.find((link)=>link.rel==='approval_url').href

      res.json({
        success:true,
        approvalUrl,
        orderId:newlyCreatedOrder._id
      })
    }
})


  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const capturePayment = async (req, res) => {
  try {

    const {paymentId,payerId,orderId}=req.body

    let order= await Order.findById(orderId)
    if(!order){
      return res.json({
        success:false,
        message:"Order cannot be found"
      })
    }

    order.paymentStatus='paid';
    order.orderStatus='confirmed';
    order.paymentId=paymentId;
    order.payerId=payerId;

    for (let item of order.cartItem){
      let product= await Product.findById(item.productId)
      if(!product){
        return res.json({
          success:false,
          message:`not enough stock for this product ${product.title}`
        })
      }

      product.totalStock -=item.quantity;

      await product.save();
    }

    const getCardId= order.cartId;
    await Cart.findByIdAndDelete(getCardId);
    await order.save();

    res.json({
      success:true,
      message:"Order confirmed",
      data:order
    })

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrderByUser=async(req,res)=>{
  try {
    const {userId}=req.params
    const orders = await Order.find({userId}).sort({updatedAt:-1})
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
const getOrderDetails=async(req,res)=>{
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
module.exports = { capturePayment, createOrder,getAllOrderByUser,getOrderDetails };
