import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null,
    token:null
}

export const registerUser= createAsyncThunk('/auth/register',

  async(formData)=>{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`,formData,{withCredentials:true})
    return response.data;
  }
)
export const loginUser= createAsyncThunk('/auth/login',

  async(formData)=>{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,formData,{withCredentials:true})
    return response.data;
  }
)
export const logoutUser= createAsyncThunk('/auth/logout',

  async()=>{
    const response= await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`,{},{withCredentials:true})
    return response.data;
  }
)

// export const checkAUth=createAsyncThunk('/auth/checkAuth',async()=>{
//   const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/checkAuth`,{withCredentials:true,
//     headers:{
//       'Cache-Control':'no-store,no-cache,must-revalidate,proxy-revalidate',
//     }
//   })
//   return response.data;
// })

export const checkAUth=createAsyncThunk('/auth/checkAuth',async(token)=>{
  const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/checkAuth`,{
    headers:{
      Authorization:`Bearer ${token}`,
      'Cache-Control':'no-store,no-cache,must-revalidate,proxy-revalidate',
    }
  })
  return response.data;
})


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
      resetTokenAndCredential:((state)=>{
       state.isAuthenticated=false,
       state.token=null,
       state.user=null
      })
      }
    ,
   extraReducers:(builder)=>{
      builder.addCase(registerUser.pending,(state)=>{
        state.isLoading=true
      }).addCase(registerUser.fulfilled,(state)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false
      }).addCase(registerUser.rejected,(state)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false
      }).addCase(loginUser.pending,(state)=>{
        state.isLoading=true
      }).addCase(loginUser.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.user=action.payload.success? action.payload.user : null,
        state.isAuthenticated=action.payload.success? true : false
        state.token=action.payload.token
        sessionStorage.setItem('token',JSON.stringify(action.payload.token))
      }).addCase(loginUser.rejected,(state)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false,
        state.token=null
      }).addCase(checkAUth.pending,(state)=>{
        state.isLoading=true
      }).addCase(checkAUth.fulfilled,(state,action)=>{
        state.isLoading=false,
        state.user=action.payload.success? action.payload.user : null,
        state.isAuthenticated=action.payload.success? true : false
      }).addCase(checkAUth.rejected,(state)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false
      }).addCase(logoutUser.pending,(state)=>{
        state.isLoading=true
      }).addCase(logoutUser.fulfilled,(state)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated= false
      }).addCase(logoutUser.rejected,(state)=>{
        state.isLoading=false,
        state.user=null,
        state.isAuthenticated=false
      })
    }
})

export const {setUser,resetTokenAndCredential} = authSlice.actions;

export default authSlice.reducer;