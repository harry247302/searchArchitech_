// redux/slices/otpSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === "DEV"
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

// Async thunk for getOtp (using email param)
export const getOtp = createAsyncThunk(
  'otp/getOtp',
  async (email, { rejectWithValue }) => {
    try {
      // Assuming the API is GET with email in URL path (as in your original)
      const response = await axios.post(`${BASE_URL}/otpVerification/getOtp/${email}`, {
        withCredentials: true,
      });
      console.log(email,"------------------------------");
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  otpData: null,
  loading: false,
  error: null,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.otpData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpData = action.payload;
      })
      .addCase(getOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
