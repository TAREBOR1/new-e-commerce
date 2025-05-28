import axios from "axios";

import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit";


const initialState={
 isLoading:false,
 featureImage:[]
}

export const AddFeature = createAsyncThunk('/feature/addFeature',async(image)=>{
  const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/common/feature/addFeature`,{image})
  return response.data
})
export const GetFeature = createAsyncThunk('/feature/getfeature',async()=>{
  const response= await axios.get(`${import.meta.env.VITE_API_URL}/api/common/feature/getFeature`)
  return response.data
})




const featureSlice= createSlice({
    name:'feature',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(AddFeature.pending,(state)=>{
            state.isLoading=true
        }).addCase(AddFeature.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false,
            state.featureImage=action.payload.data
        }).addCase(AddFeature.rejected,(state)=>{
            state.isLoading=false,
            state.featureImage=[]
        }).addCase(GetFeature.pending,(state)=>{
            state.isLoading=true
        }).addCase(GetFeature.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.featureImage=action.payload.data
        }).addCase(GetFeature.rejected,(state)=>{
            state.isLoading=false,
            state.featureImage=[]
        })
    }

})


export  default featureSlice.reducer