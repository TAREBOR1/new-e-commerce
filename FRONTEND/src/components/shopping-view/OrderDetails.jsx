import React from 'react'
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux';

const ShopOrderDetails = ({orderDetails}) => {
  const {user}=useSelector((state)=>state.auth)

  let badgeClass='bg-black'
  switch (orderDetails?.orderStatus) {
    case 'confirmed':
         badgeClass='bg-green-500'
         break;
    case 'rejected':
      badgeClass='bg-red-500'
      break;
    case 'inProcess':
      badgeClass='bg-orange-500'
      break;
    case 'pending':
      badgeClass='bg-blue-500'
      break;
  
    default:
      badgeClass='bg-black';
  }
  return (
    
<DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order Id</p>
          <Label>{orderDetails?._id}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Price</p>
          <Label>${orderDetails?.totalAmount}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Method</p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Label><Badge className={`px-3 py-1 ${badgeClass}`}> {orderDetails?.orderStatus}</Badge></Label>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Order Details</div>
          <ul className="grid gap-3">
            {
              orderDetails?.cartItem && orderDetails?.cartItem.length>0? orderDetails?.cartItem.map((orderDetailItem)=>{
             return   <li className="flex items-center justify-between">
             <span>{orderDetailItem?.title}<br/>x({orderDetailItem?.quantity})</span>
             <span>${orderDetailItem?.price}</span>
           </li>
              }):null
            }
          </ul>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>Username:{user?.userName}</span>
            <span>Address:{orderDetails?.addressInfo?.address}</span>
            <span>City:{orderDetails?.addressInfo?.city}</span>
            <span>Pincode:{orderDetails?.addressInfo?.pincode}</span>
            <span>Phone Number:{orderDetails?.addressInfo?.phone}</span>
            <span>Notes:{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
  )
}

export default ShopOrderDetails




// addressInfo
// : 
// {addressId: '67f22c403fe30987939d1276', address: 'miracl221', city: 'hfhf', phone: 'jjff', pincode: 'jfjjf', …}
// cartId
// : 
// "681cb4516c00fabf93bb9bd4"
// cartItem
// : 
// (4) [{…}, {…}, {…}, {…}]
// orderDate
// : 
// "2025-05-10T12:06:29.044Z"
// orderStatus
// : 
// "confirmed"
// orderUpdateDate
// : 
// "2025-05-10T12:06:29.044Z"
// payerId
// : 
// "45RDCPZRR2NVQ"
// paymentId
// : 
// "PAYID-NAPUCRY20Y87019SB8474222"
// paymentMethod
// : 
// "paypal"
// paymentStatus
// : 
// "paid"
// totalAmount
// : 
// 9790
// userId
// : 
// "67e12d1321088f40cebb5caa"
// __v
// : 
// 0
// _id
// : 
// "681f4148fc7a2a4c09f25d8e"
