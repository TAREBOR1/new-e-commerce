import axios from "axios";
import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";



const initialState={
    isLoading:false,
    searchResults:[]
   
   }

   export const GetSearchProduct = createAsyncThunk('/search/getSearchProduct',async(keyword)=>{
   
    const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`)
    return response.data
  })


   const searchSlice= createSlice({
       name:'shopsearch',
       initialState,
       reducers:{
        resetSearchResults:(state)=>{
            state.searchResults=[]
        }
       },
       extraReducers:(builder)=>{
           builder.addCase(GetSearchProduct.pending,(state)=>{
               state.isLoading=true
           }).addCase(GetSearchProduct.fulfilled,(state,action)=>{
               state.isLoading=false,
               state.searchResults=action.payload.data
           }).addCase(GetSearchProduct.rejected,(state)=>{
               state.isLoading=false,
               state.searchResults=[]
           })
   
   }})

   export const {resetSearchResults}= searchSlice.actions 
   export  default searchSlice.reducer;

  

