import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemContent from './CartItemContent'
import {  useNavigate } from 'react-router-dom'

const CartWrapper = ({cartItems,setOpenCartSheet}) => {
  const navigate= useNavigate()
  const totalPrice = cartItems && cartItems.length>0 ? 
  cartItems.reduce((acc,curr)=>{
    return acc + (curr?.salePrice >0 ? curr?.salePrice : curr?.price) * curr?.quantity
  },0) :0
  return (
    <SheetContent className="max-w-md overflow-y-scroll">
        <SheetHeader>
         <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-4 space-y-4'>
    {cartItems && cartItems.length>0 ?
    cartItems.map((item)=>{
return <CartItemContent key={item.id} cartItem={item}/>
    }) : null }
        </div>
        <div className='mt-8 space-y-4'>
         <div className='flex justify-between'>
      <span className='font-bold'>Total</span>
      <span className='font-bold'> ${totalPrice}</span>
         </div>
        </div>
        <Button onClick={()=>{
          setOpenCartSheet(false)
          navigate('/shop/Checkout')}} className="w-full mt-6">CheckOut</Button>

    </SheetContent>
  )
}

export default CartWrapper
