import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { captureOrder } from '@/redux/shop/orderSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation,  } from 'react-router-dom'

const PaypalReturn = () => {
  const dispatch=useDispatch()
  const location=useLocation()
  const params= new URLSearchParams(location.search)
  const payerId=params.get('PayerID')
  const paymentId=params.get('paymentId')

  useEffect(()=>{
   if(paymentId&&payerId){
    const getOrderId= JSON.parse(sessionStorage.getItem('currentOrderId'))

    dispatch(captureOrder({paymentId,payerId,orderId:getOrderId})).then((data)=>{
      if(data?.payload?.success){
        sessionStorage.removeItem('currentOrderId');
        window.location.href='/shop/payment-success'
      }
    })
   }

  },[payerId,paymentId,dispatch])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Processing Payment....Please wait!
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaypalReturn
