import axios from "axios";


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    cartItems:[],
    isLoading:false
}

export const addToCart=createAsyncThunk('/cart/addCart',async({userId,quantity,productId})=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/cart/addCart`,{userId,quantity,productId})
    return response.data
})
export const getCart=createAsyncThunk('/cart/getCart',async(userId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/cart/getCart/${userId}`)
    return response.data
})
export const updateCart=createAsyncThunk('/cart/updateCart',async({userId,quantity,productId})=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/cart/updateCart`,{userId,quantity,productId})
    return response.data
})
export const deleteCart=createAsyncThunk('/cart/deleteCart',async({userId,productId})=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/cart/deleteCart/${userId}/${productId}`)
    return response.data
})

const cartSlice=createSlice({
    name:"shopcart",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(getCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(getCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(getCart.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(updateCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(updateCart.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        }).addCase(deleteCart.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteCart.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.cartItems=action.payload.data
        }).addCase(deleteCart.rejected,(state)=>{
            state.isLoading=false,
            state.cartItems=[]
        })
    }
})

export default cartSlice.reducer