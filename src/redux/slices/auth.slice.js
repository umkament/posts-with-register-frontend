import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../axios";

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params)=>{
  const {data} = await instance.post('/auth/register', params)
  return data
})
export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params)=>{
const {data} = await instance.post('/auth/login', params)
  return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async ()=>{
  const {data} = await instance.get('/auth/me')
  return data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: 'loading',
    isLoading: false
  },
  reducers: {
    logout: (state)=>{
      state.data = null
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder)=>{
    builder
       .addCase(fetchAuth.pending, (state)=>{
         state.status = 'loading'
         state.data = null

       })
       .addCase(fetchAuth.fulfilled, (state, action)=>{
         state.status = 'loaded'
         state.data = action.payload
       })
       .addCase(fetchAuth.rejected, (state)=>{
         state.status = 'error'
         state.data = null
       })
       .addCase(fetchAuthMe.pending, (state)=>{
         state.status = 'loading'
         state.data = null

       })
       .addCase(fetchAuthMe.fulfilled, (state, action)=>{
         state.status = 'loaded'
         state.data = action.payload
       })
       .addCase(fetchAuthMe.rejected, (state)=>{
         state.status = 'error'
         state.data = null
       })
       .addCase(fetchRegistration.pending, (state)=>{
         state.status = 'loading'
         state.data = null

       })
       .addCase(fetchRegistration.fulfilled, (state, action)=>{
         state.status = 'loaded'
         state.data = action.payload
       })
       .addCase(fetchRegistration.rejected, (state)=>{
         state.status = 'error'
         state.data = null
       })
  }
})

export const isAuthSelector = (state)=> Boolean(state.auth.data)
export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions