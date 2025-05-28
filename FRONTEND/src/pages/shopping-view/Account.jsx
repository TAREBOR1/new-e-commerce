import React from 'react'
import acctImg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/components/shopping-view/Orders'
import Address from '@/components/shopping-view/Address'
import ShoppingOrders from '@/components/shopping-view/Orders'

const Account = () => {
 
  
  return (
    <div className='flex flex-col'>
       <div className='relative h-[300px] w-full overflow-hidden'>
          <img width={'1600'} height={'300'} style={{aspectRatio:'1600/800', objectFit:'cover'}} src={acctImg} alt="account-image" className='h-full w-full object-cover object-center' />
       </div>
       <div className='container mx-auto grid grid-cols-1 gap-8 py-8'>
        <div className='flex flex-col rounded-lg border bg-background shadow-sm p-6'>
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='address'>Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
  
  <ShoppingOrders/>
            </TabsContent>
            <TabsContent value="address">
<Address/>
            </TabsContent>
          </Tabs>
        </div>
       </div>
    </div>
  )
}

export default Account
