import Productfilter from '@/components/shopping-view/filter'
import ShopProductTile from '@/components/shopping-view/ShopProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { GetDetailedProduct, GetFilteredProduct } from '@/redux/shop/productSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import { addToCart, getCart } from '@/redux/shop/cartSlice'
import { toast } from 'sonner'








const Listing = () => {

  const {user}=useSelector((state)=>state.auth)
  const {productList,productDetails}=useSelector((state)=>state.shopproduct)
  const [filter,setFilter] = useState({})
  const [sort,setSort]=useState(null)
  const {cartItems}= useSelector((state)=>state.shopcart)

  const dispatch=useDispatch()

  useEffect(()=>{
  if(filter !==null && sort !==null){
   dispatch(GetFilteredProduct({filterParams:filter,sortParams:sort})).then((data)=>{
      console.log(data)
      })
  }
  },[dispatch,sort,filter])

  const handleSort=(value)=>{

    setSort(value)
  }
 
  const handleFilter=(getSectionId,getCurrentOption)=>{
    
     console.log('current,',getCurrentOption,'section',getSectionId)
 
  let cpyfilter= {...filter};
  const indexOfCurrentSection=Object.keys(cpyfilter).indexOf(getSectionId)
  if(indexOfCurrentSection===-1){
    cpyfilter={
      ...cpyfilter,
      [getSectionId]:[getCurrentOption]
    }
  }else{
    const indexOfCurrentOption= cpyfilter[getSectionId].indexOf(getCurrentOption)
    if(indexOfCurrentOption===-1){
      cpyfilter[getSectionId].push(getCurrentOption)
    }else{
      cpyfilter[getSectionId].splice(indexOfCurrentOption,1)
    }
  }
  setFilter(cpyfilter)
  sessionStorage.setItem('filters',JSON.stringify(cpyfilter))
}
const [searchParams,setSearchParams]=useSearchParams()

const createSearchParamsHelper=(filterparams)=>{
  const queryParams=[]
  for(const [key,value] of Object.entries(filterparams)){
   if(Array.isArray(value) && value.length>0){
     const ParamValue=value.join(',')
     queryParams.push(`${key}=${encodeURIComponent(ParamValue)}`)
   }
  }
  return queryParams.join('&')
 }

useEffect(()=>{
  if(filter && Object.keys(filter).length>0) {
    const createQueryString= createSearchParamsHelper(filter);
    setSearchParams(new URLSearchParams(createQueryString))
  }
 
   console.log('seaaaaaarch',searchParams)
},[filter])

const categorySearchparams=searchParams.get('category')

useEffect(()=>{
  setSort('price-lowtohigh')
  setFilter(JSON.parse(sessionStorage.getItem('filters'))||{})
},[categorySearchparams])
 
const handleGetProductDetails=(getCurrentProductID)=>{
       
          dispatch(GetDetailedProduct(getCurrentProductID))
         
}

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


const [openDetailsDialog,setOpenDetailsDialog]=useState(false)

useEffect(()=>{
  if(productDetails!==null){
    setOpenDetailsDialog(true)
  }
},[productDetails])




  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <Productfilter filter={filter} handleFilter={handleFilter}/>
      <div className='bg-background w-full rounded-lg shadow-sm'>
          <div className='p-4 border-b  flex items-center justify-between'>
       <h2 className='text-lg font-extrabold'>All products</h2>
       <div className='flex items-center gap-3'>
        <span className='text-muted-foreground'>{productList?.length} products</span>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button vairiant="outline" size="sm" className="flex items-center gap-1">
            <ArrowUpDownIcon className='w-4 h-4'/>
            <span>sort by</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
              {sortOptions.map((sortItems)=>{
                return <DropdownMenuRadioItem value={sortItems.id} key={sortItems.id}>{sortItems.label}</DropdownMenuRadioItem>
              })}
            </DropdownMenuRadioGroup>
        </DropdownMenuContent>
       </DropdownMenu>
       </div>
     
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        
            {productList && productList.length >0 ? productList.map((productItem)=>{
           return <ShopProductTile key={productItem.id} handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={productItem}/>
            }):null }       
          
          </div>
      </div>
      
    
      <ProductDetails open={openDetailsDialog}  setOpen={setOpenDetailsDialog} ProductDetails={productDetails}/>
    </div>
  )
}

export default Listing
