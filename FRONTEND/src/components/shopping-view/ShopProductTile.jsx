import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { TbCurrencyNaira } from "react-icons/tb";
import { brandOptionsMap, categoryOptionsMap } from '@/config';

const ShopProductTile = ({product,handleGetProductDetails,handleAddToCart}) => {
  return (
    <Card className='w-full max-w-sm mx-auto'>
  <div onClick={()=>handleGetProductDetails(product?._id)}>
           <div className='relative'>
              <img src={product?.image}
              alt={product?.title}
              className='w-full h-[300px] object-cover rounded-t-lg'/>
              {
              product?.totalStock === 0?  <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">out of stock</Badge> : product?.totalStock<10 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">only {product?.totalStock} items left</Badge> :
              product?.salePrice>0?<Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">sale</Badge>:null
              }
           </div>
           <CardContent className="p-4 ">
      <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-[16px] text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
        <span className='text-[16px] text-muted-foreground'>{brandOptionsMap[product?.brand]}</span>
      </div>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex space-x-0 justify-center  items-center'>
        <TbCurrencyNaira className='w-4 h-4 ' />
        <span className={`${product?.salePrice > 0 ? 'line-through' : '' } -ml-0.5 text-lg text-primary font-semibold`}> {product?.price}</span>
          </div>
        { product?.salePrice > 0 ?   <div className='flex space-x-0 justify-center  items-center'>
        <TbCurrencyNaira className='w-4 h-4 ' />
        <span className='-ml-0.5 text-lg text-primary font-semibold'> {product?.salePrice}</span>
          </div> : null} 
      </div>
           </CardContent>
    
  </div>
  <CardFooter>
    {product?.totalStock === 0?  <Button  className="w-full opacity-65 cursor-not-allowed">out of stock</Button>:  <Button onClick={()=>{handleAddToCart(product?._id,product?.totalStock)}} className="w-full">Add to Cart</Button> }
           </CardFooter>

    </Card>
  )
}

export default ShopProductTile
