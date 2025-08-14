import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Set the base URL
const BASE_URL = process.env.NEXT_PUBLIC_MODE === "DEV"
  ? process.env.NEXT_PUBLIC_DEV_URL
  : process.env.NEXT_PUBLIC_PROD_URL;

// ----------------------
// 🔹 Async Thunks
// ----------------------

export const loginAdmin = createAsyncThunk(
  'admin/loginAdmin',
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    
    try {
      const res = await axios.post(`${BASE_URL}/superAdmin/admin/login`, credentials, {
        withCredentials: true,
      });
      console.log(res);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const checkAdminLogin = createAsyncThunk(
  'admin/checkLogin',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/superAdmin/check`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const getAdminsDetails = createAsyncThunk(
  'admin/getAdminsDetails',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/superAdmin/all`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const approveArchitectStatus = createAsyncThunk(
  'admin/approveArchitectStatus',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/superAdmin/admin/block-architect`, credentials, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ----------------------
// 🔹 Slice
// ----------------------

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    approveStatus: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminsDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getAdminsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Check Login
      .addCase(checkAdminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(checkAdminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // 🔹 Approve Architect Status
      .addCase(approveArchitectStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveArchitectStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.approveStatus = action.payload;
      })
      .addCase(approveArchitectStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
