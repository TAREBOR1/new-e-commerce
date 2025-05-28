import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/banner-1.webp'
import bannertwo from '../../assets/banner-2.webp'
import bannerthree from '../../assets/banner-3.webp'
import { Button } from '@/components/ui/button'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, CodeSquareIcon, FootprintsIcon, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { GetDetailedProduct, GetFilteredProduct } from '@/redux/shop/productSlice'
import ShopProductTile from '@/components/shopping-view/ShopProductTile'
import { useNavigate } from 'react-router-dom'
import ProductDetails from './ProductDetails'
import { addToCart, getCart } from '@/redux/shop/cartSlice'
import { GetFeature } from '@/redux/featureSlice'



  const categoriesWithIcon =  [
    { id: "men", label: "Men" ,icon:ShirtIcon },
    { id: "women", label: "Women", icon:CloudLightning },
    { id: "kids", label: "Kids" ,icon:BabyIcon },
    { id: "accessories", label: "Accessories" ,icon:WatchIcon },
    { id: "footwear", label: "Footwear" ,icon:UmbrellaIcon },
  ]

  const   brandWithIcons= [
    { id: "nike", label: "Nike", icon:CodeSquareIcon },
    { id: "adidas", label: "Adidas" , icon:FootprintsIcon},
    { id: "puma", label: "Puma", icon:CloudLightning  },
    { id: "levi", label: "Levi's",icon:BabyIcon },
    { id: "zara", label: "Zara" , icon:UmbrellaIcon},
    { id: "h&m", label: "H&M", icon:CloudLightning },
  ]

const Home = () => {
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  const [currentSlide,setCurrentSlide]=useState(0)
  const {user}=useSelector((state)=>state.auth)
    const {featureImage}=useSelector((state)=>state.feature)
  const {productList,productDetails}=useSelector((state)=>state.shopproduct)
  const navigate=useNavigate()
  
  const dispatch=useDispatch()
  useEffect(() => {
    if (featureImage.length === 0) return;
 
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImage.length);
    }, 4000);
  
    return () => clearInterval(timer);
  }, [featureImage]);
  
  useEffect(()=>{
    dispatch(GetFilteredProduct({filterParams:{},sortParams:"price-lowtohigh"}))
  },[dispatch])

  const handleNavigateTolistingPage=(getCurrentItem,section)=>{

    sessionStorage.removeItem('filters')
    const currentFilter={
      [section]:[getCurrentItem.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }
  const handleGetProductDetails=(getCurrentProductID)=>{     
   dispatch(GetDetailedProduct(getCurrentProductID))
  }
  const handleAddToCart=(getCurrentProductId)=>{
    dispatch(addToCart({userId:user?.id,quantity:1,productId:getCurrentProductId})).then((data)=>{
      if(data?.payload?.success){
        dispatch(getCart(user?.id))
      }
    })
  }
  useEffect(()=>{
    if(productDetails!==null){
      setOpenDetailsDialog(true)
    }
  },[productDetails])

    useEffect(()=>{
     dispatch(GetFeature())
      },[dispatch])
  return (
    <div className='flex flex-col min-h-screen'>
     <div className='relative w-full h-screen overflow-hidden '>
      {featureImage && featureImage.length>0? featureImage.map((slide,index)=>{
       return <img   src={slide?.image}
       key={index}
       className={`absolute ${index===currentSlide ? 'opacity-100' :'opacity-0'}  top-0 left-0 w-full h-full object-cover duration-1000 transition-opacity`}/>
      }):null}
      <Button onClick={()=>{setCurrentSlide((prev)=>{
        return (prev-1 +featureImage.length) % featureImage.length
      })}}
       variant='outline' size='icon' className='absolute top-1/2 left-4 transform -translate-y-2 bg-white/80'>
        <ChevronLeftIcon className='h-4 w-4'/>
      </Button>
      <Button onClick={()=>{setCurrentSlide((prev)=>{
        return (prev+1) % featureImage.length
      })}} variant='outline' size='icon' className='absolute top-1/2 right-4 transform -translate-y-2 bg-white/80'>
        <ChevronRightIcon className='h-4 w-4'/>
        
      </Button>
     </div>
     <section className='py-12 bg-gray-50 '>
  <div className='mx-auto container px-4'>
   <h2 className='text-3xl font-bold mb-8 text-center'>Shop by category</h2>
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
    {categoriesWithIcon.map((categoryItem)=><Card onClick={()=>{handleNavigateTolistingPage(categoryItem,'category')}} className="cursor-pointer hover:shadow-lg transition-shadow">
    <CardContent className="flex flex-col items-center justify-center p-4">
      <categoryItem.icon className='w-12 h-12 mb-4 text-primary'/>
    <span className='font-bold'>{categoryItem.label}</span>
    </CardContent>
    </Card>)}
   </div>
  </div>
     </section>


     <section className='py-12 bg-gray-50 '>
  <div className='mx-auto container px-4'>
   <h2 className='text-3xl font-bold mb-8 text-center'>Shop by brand</h2>
   <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
    {brandWithIcons.map((brandItem)=><Card onClick={()=>{handleNavigateTolistingPage(brandItem,'brand')}} className="cursor-pointer hover:shadow-lg transition-shadow">
    <CardContent className="flex flex-col items-center justify-center p-4">
      <brandItem.icon className='w-12 h-12 mb-4 text-primary'/>
    <span className='font-bold'>{brandItem.label}</span>
    </CardContent>
    </Card>)}
   </div>
  </div>
     </section>

     <section className='py-12 bg-gray-50'>
     <div className='mx-auto container px-4'>
     <h2 className='text-3xl font-bold mb-8 text-center'>Feature Product</h2>
     </div>
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
   {productList && productList.length>0?productList.map((productItem)=>{
      return <ShopProductTile handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart}  product={productItem}/>
   }):null}
     </div>
     <ProductDetails open={openDetailsDialog}  setOpen={setOpenDetailsDialog} ProductDetails={productDetails}/>
     </section>
    </div>
  )
}

export default Home
