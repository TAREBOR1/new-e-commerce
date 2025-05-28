import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo,handleDeleteAddress,handleEditAddress,setCurrentSelectedAddress,selectedId}) => {
  return (
   <Card className={` cursor-pointer ${selectedId?._id===addressInfo?._id ? 'border-black border-[3px]':''}`} onClick={()=>{setCurrentSelectedAddress? setCurrentSelectedAddress(addressInfo):null}}>
    <CardContent className={`grid p-4 gap-4 `}>
    <Label>Address:{addressInfo?.address}</Label>
    <Label>City:{addressInfo?.city}</Label>
    <Label>Pincode:{addressInfo?.pincode}</Label>
    <Label>Phone Number:{addressInfo?.phone}</Label>
    <Label>Notes:{addressInfo?.notes}</Label>
    </CardContent>
    <CardFooter className="flex justify-between p-3">
        <Button onClick={()=>{handleEditAddress(addressInfo)}}>Edit</Button>
        <Button onClick={()=>{handleDeleteAddress(addressInfo)}}>Delete</Button>
    </CardFooter>
   </Card>
  )
}

export default AddressCard
