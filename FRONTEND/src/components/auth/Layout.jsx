import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex min-h-screen w-full '>
        <div className='hidden lg:flex items-center justify-center w-1/2 bg-black px-12'>
        <div className='max-w-md text-center space-y-6 text-primary'>
    <h1 className='text-4xl text-white font-extrabold tracking-tight'>welcome to ecommerce shopping</h1>
        </div>
        </div>
        <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout
