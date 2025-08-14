import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === 'DEV'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

export const submitForm = createAsyncThunk(
  'contact/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/feedback/submit`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchForm = createAsyncThunk(
  'contact/fetchForm',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/contact/fetch`, {
        params: { page, limit }, // ✅ Correct for GET requests
        withCredentials: true,
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);




export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (ids, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/contact/deleteById`, {
        data: { ids },
        withCredentials: true,
      });
      return response.data; // contains deletedIds
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to delete contact(s)'
      );
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    formData: null,
    fetchData: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.error = null;
      state.formData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit Form
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Form
      .addCase(fetchForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForm.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchData = action.payload;
      })
      .addCase(fetchForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Contact(s)
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        const deletedIds = action.payload.deletedIds;
        if (Array.isArray(deletedIds) && Array.isArray(state.fetchData)) {
          state.fetchData = state.fetchData.filter(
            contact => !deletedIds.includes(contact.id)
          );
        }
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;

export default contactSlice.reducer;
