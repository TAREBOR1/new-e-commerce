import axios from "axios";

import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";


const initialState={
 isLoading:false,
 productList:[]
}

export const AddProduct = createAsyncThunk('/product/addProduct',async(formData)=>{
  const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/product/addProduct`,formData,{headers:{
    "Content-Type":'application/json'
  }})
  return response.data
})
export const GetProduct = createAsyncThunk('/product/getProduct',async()=>{
  const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/product/getProduct`)
  return response.data
})
export const UpdateProduct = createAsyncThunk('/product/updateproduct',async({id,formData})=>{
  const response= await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/product/updateProduct/${id}`,formData,{headers:{
    "Content-Type":'application/json'
  }})
  return response.data
})
export const DeleteProduct = createAsyncThunk('/product/deleteProduct',async(id)=>{
  const response= await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/product/deleteProduct/${id}`)
  return response.data
})



const productSlice= createSlice({
    name:'adminproduct',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(AddProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(AddProduct.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false,
            state.productList=action.payload
        }).addCase(AddProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productList=[]
        }).addCase(GetProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(GetProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productList=action.payload.data
        }).addCase(GetProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productList=[]
        }).addCase(UpdateProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(UpdateProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productList=action.payload
        }).addCase(UpdateProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productList=[]
        }).addCase(DeleteProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(DeleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productList=action.payload
        }).addCase(DeleteProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productList=[]
        })
    }

})


export  default productSlice.reducer