import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const naviagte=useNavigate()
  return (
     <Card className='p-10'>
         <CardHeader className='p-0'>
           <CardTitle className="text-4xl">
            Payment is successful!
           </CardTitle>
         </CardHeader>
         <Button className='mt-5' onClick={()=>{naviagte('/shop/account')}}>
          View orders
         </Button>
       </Card>
  )
}

export default PaymentSuccess
