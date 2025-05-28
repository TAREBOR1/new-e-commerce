import axios from "axios";
import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";


const initialState={
    isLoading:false,
    productList:[],
    productDetails:null
   }

  
  export const GetFilteredProduct = createAsyncThunk('/product/getFilteredProduct',async({filterParams,sortParams})=>{
    const query= new URLSearchParams({
        ...filterParams,
        sortBy:sortParams
    })
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/product/getFilteredProduct?${query}`)
   
    return response.data
  })
  export const GetDetailedProduct = createAsyncThunk('/product/getDetailedProduct',async(id)=>{
  
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/product/getDetailedProduct/${id}`)
    return response.data
  })
 
 



const productSlice= createSlice({
    name:'shopproduct',
    initialState,
    reducers:{
        setProductDetails:(state)=>{
            state.productDetails=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(GetFilteredProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(GetFilteredProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productList=action.payload.data
        }).addCase(GetFilteredProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productList=[]
        }).addCase(GetDetailedProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(GetDetailedProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.productDetails=action.payload.data
        }).addCase(GetDetailedProduct.rejected,(state)=>{
            state.isLoading=false,
            state.productDetails=null
        })

}})

export const {setProductDetails} = productSlice.actions;
export  default productSlice.reducer