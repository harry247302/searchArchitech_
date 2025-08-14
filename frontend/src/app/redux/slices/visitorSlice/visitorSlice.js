// redux/slices/visitorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_MODE === "DEV"
  ? process.env.NEXT_PUBLIC_DEV_URL
  : process.env.NEXT_PUBLIC_PROD_URL;

  
export const getVisitorById = createAsyncThunk(
  'visitor/getVisitorById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/visitor/getVisitorById/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


  
export const getVisitorsByTodayTomorrow = createAsyncThunk(
  'visitor/getVisitorById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/visitor/visitors-by-today-tomorrow`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const visitorSlice = createSlice({
  name: 'visitor',
  initialState: {
    visitor: null,
    filterVisitors:[],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearVisitor(state) {
      state.visitor = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getVisitorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVisitorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.visitor = action.payload;
      })
      .addCase(getVisitorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


       .addCase(getVisitorsByTodayTomorrow.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVisitorsByTodayTomorrow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filterVisitors = action.payload;
      })
      .addCase(getVisitorsByTodayTomorrow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearVisitor } = visitorSlice.actions;
export default visitorSlice.reducer;
