import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
 isLoading:false,
 orderList:[],
 orderDetails:null
}

  export const getAllOrderForAdmin=createAsyncThunk('/adminOrder/list',async()=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/order/list`)
    return response.data
})
  export const getOrderDetails=createAsyncThunk('/adminOrder/details',async(id)=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/order/details/${id}`)
    return response.data
})
  export const updateOrderStatus=createAsyncThunk('/adminOrder/update',async({id,orderStatus})=>{
    const response= await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/order/update/${id}`,{orderStatus})
    return response.data
})



const orderSlice=createSlice({
    name:"adminorder",
    initialState,
    reducers:{
        resetOrderDetails:(state)=>{
            state.orderDetails=null;
        }
    },
    extraReducers:(builders)=>{
        builders.addCase(getAllOrderForAdmin.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAllOrderForAdmin.fulfilled,(state,action)=>{
            state.isLoading=false
           state.orderList=action.payload.data
        }).addCase(getAllOrderForAdmin.rejected,(state)=>{
            state.isLoading=false
            state.orderList=[]
        }).addCase(getOrderDetails.pending,(state)=>{
            state.isLoading=true
        }).addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.isLoading=false
            state.orderDetails=action.payload.data
        }).addCase(getOrderDetails.rejected,(state)=>{
            state.isLoading=false
            state.orderDetails=null
        })
    }
})

export const {resetOrderDetails}= orderSlice.actions;

export default orderSlice.reducer