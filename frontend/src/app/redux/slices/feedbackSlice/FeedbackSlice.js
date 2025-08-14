import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === 'DEV'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

// Submit feedback form
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

// Fetch feedback list for architect
export const fetchFeedbackByArchitect = createAsyncThunk(
  'contact/fetchFeedbackByArchitect',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/feedback/getFeedback`, {
        withCredentials: true
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const getFeedback = createAsyncThunk(
  'contact/fetchFeedbackByArchitect',
  async (uuid, { rejectWithValue }) => {
    try {
      console.log(uuid,"|||||||||||||||||||||||||||||||||||||||||||||||");
      
      const response = await axios.get(`${BASE_URL}/feedback/getFeedback/${uuid}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);




const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    fetchFeedback: null,
    feedback: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle submitForm
      .addCase(submitForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchFeedbackByArchitect
      .addCase(fetchFeedbackByArchitect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackByArchitect.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchFeedback = action.payload;
      })
      .addCase(fetchFeedbackByArchitect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
