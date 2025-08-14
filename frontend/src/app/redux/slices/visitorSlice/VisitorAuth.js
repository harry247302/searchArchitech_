// redux/slices/visitorSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_MODE === "DEV"
  ? process.env.NEXT_PUBLIC_DEV_URL
  : process.env.NEXT_PUBLIC_PROD_URL;

// Async thunk for visitor sign up
export const visitorSignUp = createAsyncThunk(
  'visitor/signUp',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/visitor_routers/visitor-signUp`,
        credentials,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for visitor login
export const visitorLogin = createAsyncThunk(
  'visitor/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/visitor_routers/visitor-logIn`,
        credentials,
        { withCredentials: true }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for visitor Google login
export const visitorGoogleLogin = createAsyncThunk(
  'visitor/googleLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}visitor_routers/visitor-google-logIn`,
        credentials,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getVisitorById = createAsyncThunk(
  'visitor/getVisitorById',
  async (_, { rejectWithValue }) => {  // <-- underscore means no argument expected
    try {
      const response = await axios.get(`${BASE_URL}/visitor/getVisitorById`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);



const initialState = {
  visitorInfo: null,
  loading: false,
  error: null,
};

const visitorSlice = createSlice({
  name: 'visitor',
  initialState,
  reducers: {
    // optionally, you can add logout or reset actions here
    resetVisitorState: (state) => {
      state.visitor = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // signUp
      .addCase(visitorSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(visitorSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.visitorInfo = action.payload;
      })
      .addCase(visitorSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(getVisitorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVisitorById.fulfilled, (state, action) => {
        state.loading = false;
        state.visitorInfo = action.payload;
      })
      .addCase(getVisitorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // googleLogin
      .addCase(visitorGoogleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(visitorGoogleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.visitorInfo = action.payload;
      })
      .addCase(visitorGoogleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVisitorState } = visitorSlice.actions;
export default visitorSlice.reducer;
