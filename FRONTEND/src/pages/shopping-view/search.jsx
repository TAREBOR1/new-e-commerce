import ShopProductTile from '@/components/shopping-view/ShopProductTile'
import { Input } from '@/components/ui/input'
import { addToCart, getCart } from '@/redux/shop/cartSlice'
import { GetSearchProduct, resetSearchResults } from '@/redux/shop/searchSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import ProductDetails from './ProductDetails'
import { GetDetailedProduct } from '@/redux/shop/productSlice'



const Search = () => {
    const [keyword,setKeyword]=useState('')
    const [searchParams,setSearchParams]=useSearchParams()
    const {productDetails}=useSelector((state)=>state.shopproduct)
    const dispatch=useDispatch()
    const {searchResults}= useSelector(state=>state.shopsearch)
      const {cartItems}= useSelector((state)=>state.shopcart)
    const {user}=useSelector((state)=>state.auth)
    
    useEffect(()=>{
if(keyword && keyword.trim()!=='' && keyword.trim().length>3){
   setTimeout(()=>{
     setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
     dispatch(GetSearchProduct(keyword))
   },1000)
}else{
  dispatch(resetSearchResults())
}
    },[keyword])

    console.log('tarebor',searchResults)


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

    const handleGetProductDetails=(getCurrentProductID)=>{
           
              dispatch(GetDetailedProduct(getCurrentProductID))
             
    }

    const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
    
    useEffect(()=>{
      if(productDetails!==null){
        setOpenDetailsDialog(true)
      }
    },[productDetails])


  return (
    <div className='container mx-auto md:px-6 px-4 py-8'>
      <div className='flex justify-center mb-8'>
     <div className='w-full flex items-center'>
        <Input value={keyword} name="keyword" onChange={e=>setKeyword(e.target.value)} className='py-6' placeholder='Search products...'/>
     </div>
      </div>
      <div className='min-h-[300px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
  {searchResults && searchResults.length > 0 ? (
    searchResults.map((items) => (
      <ShopProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={items} key={items._id} />
    ))
  ) : (
    <div className='col-span-full flex items-center justify-center h-full py-20'>
      <h1 className='text-3xl font-extrabold text-center'>No result found!</h1>
    </div>
  )}
</div>
<ProductDetails open={openDetailsDialog}  setOpen={setOpenDetailsDialog} ProductDetails={productDetails}/>
    </div>
  )
}

export default Search
