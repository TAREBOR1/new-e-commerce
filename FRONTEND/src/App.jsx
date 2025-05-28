import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/auth/Layout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import AdminLayout from './components/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import Orders from './pages/admin-view/Orders'
import Products from './pages/admin-view/Products'
import Features from './pages/admin-view/Features'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/not-found/NotFound'
import Account from './pages/shopping-view/Account'
import Checkout from './pages/shopping-view/Checkout'
import Home from './pages/shopping-view/Home'
import Listing from './pages/shopping-view/Listing'
import CheckAuth from './components/common-view/CheckAuth'
import UnauthPage from './pages/UnauthPage.jsx/UnauthPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAUth } from './redux/authSlice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturn from './pages/shopping-view/paypal-return'
import PaymentSuccess from './pages/shopping-view/payment-success'
import Search from './pages/shopping-view/search'






const App = () => {
  const{isAuthenticated,user,isLoading}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(checkAUth()).then((data)=>{
        console.log(data)
      })
  },[dispatch])
  if(isLoading){
    return  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[800px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-full" />
    </div>
  </div>
  }
  return (
     <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path='/' element={
         <CheckAuth isAuthenticated={isAuthenticated} user={user} >
         </CheckAuth>
          }
        
        />


       
        <Route path='/auth' element={
         <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            <Layout/>
         </CheckAuth>
          }>
          <Route path='login' element={<Login/>}/> 
          <Route path='register' element={<SignUp/>}/> 
        </Route>
        <Route path='/admin' element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
           <AdminLayout/>
        </CheckAuth>
          }>
          <Route path='Dashboard' element={<Dashboard/>}/>
          <Route path='Orders' element={<Orders/>}/>
          <Route path='Products' element={<Products/>}/>
          <Route path='Features' element={<Features/>}/>
        </Route>
        <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
         </CheckAuth>
          }>
         <Route path='account' element={<Account/>}/>
         <Route path='checkout' element={<Checkout/>}/>
         <Route path='home' element={<Home/>}/>
         <Route path='listing' element={<Listing/>}/>
         <Route path='search' element={<Search/>}/>
      <Route path='paypal-return' element={<PaypalReturn/>}/>
      <Route path='payment-success' element={<PaymentSuccess/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
        <Route path='/unauthorised-page' element={<UnauthPage/>}/>
      </Routes>
     </div>
  )
}

export default App
