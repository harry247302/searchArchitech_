// redux/slices/architectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === "DEV"
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

// ----------------------------------
// 🔹 Async Thunks
export const updateArchitectsById = createAsyncThunk(
  "architech/updateById",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/architech/update`, // 🔄 no ID in URL
        formData,                      // ✅ only send the formData
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json', // or multipart/form-data if needed
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchAllArchitects = createAsyncThunk(
  "architect/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/architech/fetchAll`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const dynamic_architech = createAsyncThunk(
  "architect/dynamicAarchitech",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/architech/dynamic_architech`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchArchitectsByPagination = createAsyncThunk(
  "architect/fetchByPagination",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/architech/fetchByPagination?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteMultipleArchitects = createAsyncThunk(
  "architect/deleteMultiple",
  async (ids, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/architech/delete-multiple`,
        { ids },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchById = createAsyncThunk(
  "architect/fetchById",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/architech/fetchById`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProfileById = createAsyncThunk(
  "architect/fetchProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/architech/fetchProfileById/${id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const GetFilteration = createAsyncThunk(
  "architech/filteration",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/architech/filter`, {
        params: data, // ✅ Use query params for GET
        withCredentials: true,
      });

      return res.data; // ✅ Return only data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // ✅ fixed 'err'
    }
  }
);


const architectSlice = createSlice({
  name: "architect",
  initialState: {
    architects: [],
    filteration:[],
    dynamicArchitech:[],
    paginatedArchitects: [],
    selectedArchitect: null,
    loading: false,
    error: null,
    deleteStatus: null,
    isAuthenticated: false,
  },
  reducers: {
    clearDeleteStatus(state) {
      state.deleteStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllArchitects
      .addCase(fetchAllArchitects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArchitects.fulfilled, (state, action) => {
        state.loading = false;
        state.architects = action.payload.data;
        // console.log(state.architects);
      })
      .addCase(fetchAllArchitects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchArchitectsByPagination
      .addCase(fetchArchitectsByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchitectsByPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.paginatedArchitects = action.payload;
      })
      .addCase(fetchArchitectsByPagination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedArchitect = action.payload; // or action.payload.data based on your API
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedArchitect = null;
      })

      // deleteMultipleArchitects
      .addCase(deleteMultipleArchitects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMultipleArchitects.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteStatus = action.payload;
      })
      .addCase(deleteMultipleArchitects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  

      .addCase(GetFilteration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFilteration.fulfilled, (state, action) => {
        state.loading = false;
        state.filteration = action.payload.data;         
      })
      .addCase(GetFilteration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.filteration = null;
      })      
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.architects = action.payload.architect;
        state.isAuthenticated = true;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.architects = null;
        state.isAuthenticated = false;
      })

      // updateArchitectsById
      .addCase(updateArchitectsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArchitectsById.fulfilled, (state, action) => {
        state.loading = false;
        // Update selectedArchitect with the latest data
        state.selectedArchitect = action.payload.updatedArchitect;
      })
      .addCase(updateArchitectsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(dynamic_architech.pending, (state) => {
       state.loading = true;
       state.error = null;
      })
      .addCase(dynamic_architech.fulfilled, (state, action) => {
        state.loading = false;
        // Update selectedArchitect with the latest data
        state.dynamicArchitech = action.payload;
      })
      .addCase(dynamic_architech.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});

// ----------------------------------
// 🔹 Exports
// ----------------------------------

export const { clearDeleteStatus } = architectSlice.actions;
export default architectSlice.reducer;
