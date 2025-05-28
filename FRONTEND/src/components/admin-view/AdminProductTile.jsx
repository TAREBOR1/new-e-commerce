


import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'


const AdminProductTile = ({product,setCurrentEditedId,setOpenCreateProductDialog,setFormData,HandleDelete }) => {
  return (
     <Card key={product._id} className="w-full max-w-sm mx-auto">
        <div className='relative'>
            <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg'/>
        </div>
        <CardContent>
            <h2 className='text-xl font-bold mb-2 mt-2'>{product?.title}</h2>
            <div className='flex items-center mb-2 justify-between'>
               <span className={`${product?.salePrice >0 ? "line-through":""} text-lg font-semibold text-primary`}> ${product?.price}</span>
               {product?.salePrice>0 ?   <span className='text-lg font-bold'> ${product?.salePrice}</span>: null }
             
                </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <Button onClick={()=>{
                setCurrentEditedId(product?._id)
                setFormData(product)
                setOpenCreateProductDialog(true)
              
            }}>Edit</Button>
            <Button onClick={()=>{
                HandleDelete(product?._id)
            }}>Delete</Button>
        </CardFooter>
     </Card>
  )
}

export default AdminProductTile
