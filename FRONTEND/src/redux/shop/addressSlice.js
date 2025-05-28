import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    address:[]
}

export const addAddress = createAsyncThunk("/address/addAddress", async(formData)=>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/address/addAddress`,formData)
    return response.data
})
export const getAddress = createAsyncThunk("/address/getAddress", async(userId)=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/getAddress/${userId}`)
    return response.data
})
export const updateAddress = createAsyncThunk("/address/updateAddress", async({userId,addressId,formData})=>{
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/shop/address/updateAddress/${userId}/${addressId}`,formData)
    return response.data
})
export const deleteAddress = createAsyncThunk("/address/deleteAddress", async({userId,addressId})=>{
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/deleteAddress/${userId}/${addressId}`)
    return response.data
})

const addressSlice = createSlice({
    name:'shopaddress',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(addAddress.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(addAddress.rejected,(state)=>{
            state.isLoading=false
        }).addCase(getAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(getAddress.fulfilled,(state,action)=>{
            state.isLoading=false
            state.address=action.payload.data
        }).addCase(getAddress.rejected,(state)=>{
            state.isLoading=false
            state.address=[]
        }).addCase(updateAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(updateAddress.fulfilled,(state,action)=>{
            state.isLoading=false
            state.address=action.payload.data
        }).addCase(updateAddress.rejected,(state)=>{
            state.isLoading=false
            state.address=[]
        }).addCase(deleteAddress.pending,(state)=>{
            state.isLoading=true
        }).addCase(deleteAddress.fulfilled,(state)=>{
            state.isLoading=false
        }).addCase(deleteAddress.rejected,(state)=>{
            state.isLoading=false
        })
    }
})


export default addressSlice.reducer