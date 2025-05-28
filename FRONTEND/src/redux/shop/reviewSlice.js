import axios from "axios";
import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";



const initialState={
    isLoading:false,
    reviews:[]
   
   }

   export const GetReviewProduct = createAsyncThunk('/review/getReviewProduct',async(productId)=>{
   
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/getReview/${productId}`)
    return response.data
  })
   export const addReviewProduct = createAsyncThunk('/review/addReviewProduct',async(formData)=>{
   
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/addReview`,formData)
    return response.data
  })


   const reviewSlice= createSlice({
       name:'shopreview',
       initialState,
       reducers:{},
       extraReducers:(builder)=>{
           builder.addCase(GetReviewProduct.pending,(state)=>{
               state.isLoading=true
           }).addCase(GetReviewProduct.fulfilled,(state,action)=>{
               state.isLoading=false,
               state.reviews=action.payload.data
           }).addCase(GetReviewProduct.rejected,(state)=>{
               state.isLoading=false,
               state.reviews=[]
           }).addCase(addReviewProduct.pending,(state)=>{
            state.isLoading=true
        }).addCase(addReviewProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.reviews=action.payload.data
        }).addCase(addReviewProduct.rejected,(state)=>{
            state.isLoading=false,
            state.reviews=[]
        })
   
   }})

//    export const {resetSearchResults}= searchSlice.actions 
   export  default reviewSlice.reducer;

  

