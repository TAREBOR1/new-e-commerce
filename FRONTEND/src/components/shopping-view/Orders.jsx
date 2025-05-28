import React, { useEffect } from 'react'
import {Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { useState } from 'react'
import ShopOrderDetails from './OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, getOrderList, resetOrderDetails } from '@/redux/shop/orderSlice'
import { Badge } from '../ui/badge'



const ShoppingOrders = () => {
    const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
    const dispatch= useDispatch()
    const {user} =useSelector((state)=>state.auth)
    const {orderList,orderDetails}=useSelector((state)=>state.orderproduct)
    const handleFetchOrderDetails=(getId)=>{
       dispatch(getOrderDetails(getId))
    }
    useEffect(()=>{
      dispatch(getOrderList(user?.id))
    },[dispatch])

    useEffect(()=>{
     if(orderDetails!==null){
      setOpenDetailsDialog(true)
     }
    },[orderDetails])
console.log(orderDetails,'yo its orderDetail')
   
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead><span className='sr-only'>Details</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orderList && orderList.length>0 ? orderList.map((orderItem)=>{
                let badgeClass='bg-black'
                  switch (orderItem?.orderStatus) {
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
                return   <TableRow key={orderItem?._id}>
                <TableCell>{(orderItem?._id)}</TableCell>
                <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                <TableCell><Badge className={`px-3 py-1 ${badgeClass}`}> {orderItem?.orderStatus}</Badge></TableCell>
                <TableCell>${orderItem?.totalAmount}</TableCell>
                <TableCell>
                <Dialog open={openDetailsDialog} onOpenChange={()=>{
                  setOpenDetailsDialog(false)
                  dispatch(resetOrderDetails())
                }}>
                  <Button onClick={()=>{handleFetchOrderDetails(orderItem?._id)}}>View details</Button>
                  <ShopOrderDetails orderDetails={orderDetails}/>
                  </Dialog>
                </TableCell>
              </TableRow>
              }) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ShoppingOrders


