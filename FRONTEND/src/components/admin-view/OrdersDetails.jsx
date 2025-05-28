import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import Form from "../common-view/Form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForAdmin, getOrderDetails, updateOrderStatus } from "@/redux/Admin/orderSlice";
import { toast } from "sonner";

const AdminOrdersDetails = ({orderDetails,setOpenDetailsDialog}) => {

    const initialState={
        status:''
    }

    const [formData,setFormData]=useState(initialState)
    const {user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()

    const handleUpdateOrder=(e)=>{
   e.preventDefault()
   const {status}=formData
   dispatch(updateOrderStatus({id:orderDetails?._id,orderStatus:status})).then((data)=>{
    if(data?.payload?.success){
      dispatch(getOrderDetails(orderDetails?._id))
      dispatch(getAllOrderForAdmin())
      setFormData(initialState)
      toast(data?.payload?.message)
      // setOpenDetailsDialog(false)
    }
   })
   
    }

    console.log(formData,'yoo forming')

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

        <div>
            <Form FormControls={[ {
      label: "Order Status",
      name: "status",
      componentType: "select",
      options: [
        { id: "pending", label: "Pending" },
        { id: "inProcess", label: "In Process" },
        { id: "inShipping", label: "In Shipping" },
        { id: "outForDelivery", label: "Out For Delivery" },
        { id: "delivered", label: "Delivered" },
        { id: "rejected", label: "Rejected" },
      ],
    }]} FormData={formData} setFormData={setFormData} buttonText={'Update Order Status'} onSubmit={handleUpdateOrder} />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrdersDetails;
