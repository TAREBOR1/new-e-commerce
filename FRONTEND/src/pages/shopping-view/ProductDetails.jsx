import StarRating from '@/components/common-view/StarRating'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { addToCart, getCart } from '@/redux/shop/cartSlice'
import { setProductDetails } from '@/redux/shop/productSlice'
import { addReviewProduct, GetReviewProduct } from '@/redux/shop/reviewSlice'
import { StarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const ProductDetails = ({ open, setOpen, ProductDetails }) => {
  const dispatch= useDispatch()
  const {user}=useSelector((state)=>state.auth)
   const {cartItems}= useSelector((state)=>state.shopcart)
   const {reviews}=useSelector((state)=>state.shopreview)
  const handleAddToCart=(getCurrentProductId,getTotalStock)=>{

    let getCartItems=cartItems?.items || [];
    if(getCartItems.length){
      const indexOfCurrentitem= getCartItems.findIndex(item=>item.productId===getCurrentProductId)
      if(indexOfCurrentitem>-1){
        const getQuantity=getCartItems[indexOfCurrentitem].quantity
        if(getQuantity +1 > getTotalStock){
          toast.error(`only ${getQuantity} can be added for this item`)
          
          
          return;
        }
      }
      
    }
    dispatch(addToCart({userId:user?.id,quantity:1,productId:getCurrentProductId})).then((data)=>{
      if(data?.payload?.success){
        dispatch(getCart(user?.id))
      }
  
    })
  }
  const handleDialogClose = ()=>{
    setOpen(false)
    dispatch(setProductDetails())
    setRating(0)
    setreviewMsg('')
  }

  const [reviewMsg,setreviewMsg]=useState('')
 const [rating,setRating]= useState(0)

 const handleRatingChange=(getRating)=>{
   setRating(getRating)
 }

 const handleAddReview =() =>{
  dispatch(addReviewProduct({
    userId:user?.id,
    productId :ProductDetails?._id,
    userName:user?.userName,
    reviewMessage:reviewMsg,
    reviewValue:rating,
  })).then((data)=>{
   if(data?.payload?.success){
        setRating(0)
    setreviewMsg('')
    dispatch(GetReviewProduct(ProductDetails?._id))
    toast.success('Review added successfully')
   }
  })
 }

 useEffect(()=>{
  if(ProductDetails !==null){
    dispatch(GetReviewProduct(ProductDetails?._id))
  }
 },[ProductDetails])

 const averageReview= reviews && reviews.length >0 ?
  reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviews.length : 0
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 overflow-auto gap-8 sm:p-12 max-w-[80vw] max-h-[80vh] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={ProductDetails?.image}
            alt={ProductDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{ProductDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {ProductDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary  ${
                ProductDetails?.salePrice > 0 ? 'line-through' : ''
              }`}
            >
              {ProductDetails?.price}
            </p>
            {ProductDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {ProductDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className='flex items-center gap-2  mt-2'>

          <div className='flex items-center gap-0.5'>
            <StarRating rating={averageReview}/>
 </div>

 <span className='text-muted-foreground'>({averageReview.toFixed(2)})</span>
            
          </div>

          <div className="mt-5 mb-5">
                {ProductDetails?.totalStock === 0?  <Button  className="w-full opacity-65 cursor-not-allowed">out of stock</Button>:  <Button onClick={()=>{handleAddToCart(ProductDetails?._id,ProductDetails?.totalStock)}} className="w-full">Add to Cart</Button> }
          </div>
          <Separator />
          <div className='max-h-[300px] overflow-y-auto'>
            <h2 className='text-xl font-bold mb-4'>Reviews</h2>
            <div className='grid gap-6'>

        {/* rewview statrt  */}

        {
          reviews && reviews.length>0 ? reviews.map((reviewItem)=>{
          return   <div className='flex gap-4'>
            <Avatar className={'w-10 h-10 border'}>
                <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
             <div className='flex items-center gap-2'>
                <h3 className='font-bold'>{reviewItem?.userName}</h3>
             </div>
             <div className='flex items-center gap-0.5'>
              <StarRating rating={reviewItem?.reviewValue}/>
             </div>
             <p className='text-muted-foreground'>{reviewItem?.reviewMessage}</p>
            </div>
            </div>
          }) : <h2>No reviews</h2>
        }
           

{/* revieiew end */}

            </div>
            <div className='mt-10 flex flex-col gap-2'>
              <Label>Write a Review</Label>
              <div className='flex gap-0.5'>
               <StarRating handleRatingChange={handleRatingChange} rating={rating} />
              </div>
          <Input value={reviewMsg} name="reviewMsg" onChange={e=>setreviewMsg(e.target.value)}  placeholder="write a review..."/>
         <Button onClick={handleAddReview} disabled={reviewMsg.trim()===''}>Submit</Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetails
