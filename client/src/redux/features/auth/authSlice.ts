import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '@/lib/axios'

export const verifyLogin = createAsyncThunk('auth/verifyLogin', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/verifyLogin')
    return res.data
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Something went wrong')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isVerified: false,
    user: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(verifyLogin.fulfilled, (state, action) => {
        state.loading = false
        state.isVerified = action.payload.isVerified
        state.user = action.payload.user
      })
      .addCase(verifyLogin.rejected, (state) => {
        state.loading = false
        state.isVerified = false
        state.user = null
      })
  },
})

export default authSlice.reducer
