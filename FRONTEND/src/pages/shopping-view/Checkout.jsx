import React, { useState } from "react";
import acctImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/Address";
import { useDispatch, useSelector } from "react-redux";
import CartItemContent from "@/components/shopping-view/CartItemContent";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/redux/shop/orderSlice";
import { toast } from "sonner";


const Checkout = () => {
  const [currentSelectedAdderess,setCurrentSelectedAddress]= useState(null)
  const [isPaymentStart,setIsPaymentStart]=useState(false)
  const {approvalUrl}= useSelector((state)=>state.orderproduct)
  const { cartItems } = useSelector((state) => state.shopcart);
  const {user} = useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const totalPrice =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((acc, curr) => {
          return (
            acc +
            (curr?.salePrice > 0 ? curr?.salePrice : curr?.price) *
              curr?.quantity
          );
        }, 0)
      : 0;
      const handleInitiatePaypalPayment=()=>{
        if(cartItems.items.length===0){
          toast.error('Your Cart is empty. please add one item to proceed.') 
          return;
        }
        if(currentSelectedAdderess==null){
         toast.error('please select one address to proceed.') 
         return;
        }
      
        const orderData={
          userId:user?.id,
          cartId:cartItems?._id,
          cartItem:cartItems.items.map((singleCartItem)=>({productId:singleCartItem?.productId,
            title:singleCartItem?.title,
            image:singleCartItem?.image,
            price:singleCartItem.salePrice>0? singleCartItem?.salePrice :singleCartItem?.price,
            quantity:singleCartItem.quantity})),
          addressInfo:{
            addressId:currentSelectedAdderess?._id,
            address:currentSelectedAdderess?.address,
            city:currentSelectedAdderess?.city,
            phone:currentSelectedAdderess?.phone,
            pincode:currentSelectedAdderess?.pincode,
            notes:currentSelectedAdderess?.notes
          },
          orderStatus:'pending',
          paymentMethod:'paypal',
          paymentStatus:'pending',
          totalAmount:totalPrice,
          orderDate:new Date(),
          orderUpdateDate:new Date(),
          paymentId:'',
          payerId:"",
        }

        console.log(orderData,'yoo order data')
        dispatch(createOrder(orderData)).then((data)=>{
       console.log(data,'tarebor')
       if(data?.payload?.success){
        setIsPaymentStart(true)
       }else{
        setIsPaymentStart(false)
       }
        })
      }

   if(approvalUrl){
    window.location.href=approvalUrl
   }
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          width={"1600"}
          height={"300"}
          style={{ aspectRatio: "1600/800", objectFit: "cover" }}
          src={acctImg}
          alt="account-image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAdderess}  setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((cartItem) => {
                return <CartItemContent cartItem={cartItem} />;
              })
            : null}
            <div className="mt-8 space-y-4">
          <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold"> ${totalPrice}</span>
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button onClick={handleInitiatePaypalPayment} className='w-full'>{
            isPaymentStart? 'processing paypal payment....' : 'check out with paypal'
            }</Button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
