import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
 isLoading:false,
 approvalUrl:null,
 orderId:null,
 orderList:[],
 orderDetails:null
}

  export const createOrder=createAsyncThunk('/order/createOrder',async(orderData)=>{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/createOrder`,orderData)
    return response.data
})
  export const captureOrder=createAsyncThunk('/order/captureOrder',async({paymentId,payerId,orderId})=>{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/captureOrder`,{paymentId,payerId,orderId})
    return response.data
})
  export const getOrderList=createAsyncThunk('/order/list',async(userId)=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/list/${userId}`)
    return response.data
})
  export const getOrderDetails=createAsyncThunk('/order/details',async(id)=>{
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/details/${id}`)
    return response.data
})



const orderSlice=createSlice({
    name:"orderproduct",
    initialState,
    reducers:{
        resetOrderDetails:(state)=>{
            state.orderDetails=null;
        }
    },
    extraReducers:(builders)=>{
        builders.addCase(createOrder.pending,(state)=>{
            state.isLoading=true
        }).addCase(createOrder.fulfilled,(state,action)=>{
            state.isLoading=false
            state.approvalUrl=action.payload.approvalUrl
            state.orderId=action.payload.orderId
            sessionStorage.setItem('currentOrderId',JSON.stringify(action.payload.orderId))
        }).addCase(createOrder.rejected,(state)=>{
            state.isLoading=false
            state.approvalUrl=null
            state.orderId=null
        }).addCase(getOrderList.pending,(state)=>{
            state.isLoading=true
        }).addCase(getOrderList.fulfilled,(state,action)=>{
            state.isLoading=false
           state.orderList=action.payload.data
        }).addCase(getOrderList.rejected,(state)=>{
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