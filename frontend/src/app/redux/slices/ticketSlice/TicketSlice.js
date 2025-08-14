import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Dynamic Base URL
const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === 'DEV'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

// Create Ticket
export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/tickets/generate-ticket`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const addReply = createAsyncThunk(
  'ticket/addReply',
  async (data, { rejectWithValue }) => {
    const { ticket_id, ...formData } = data;

    try {
      const response = await axios.post(
        `${BASE_URL}/tickets/replies/${ticket_id}`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const getArchitectTicketsWithReplies = createAsyncThunk(
  'ticket/getArchitectTicketsWithReplies',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets/FetchArchitectTicketsWithReplies/${uuid}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTicketsOfArchitect = createAsyncThunk(
  'ticket/fetchTicketsOfArchitect',
  async ( _,{ rejectWithValue }) => {
    try {
      // console.log(BASE_URL,"+++++++++++++++++++++++++++");
      
      const response = await axios.get(`${BASE_URL}/tickets/my-tickets`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);




// Get Tickets for Architect
export const getTicketsForArchitect = createAsyncThunk(
  'ticket/getTicketsForArchitect',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets/all`, {}, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Ticket Slice
const ticketSlice = createSlice({
  name: 'ticket',
  initialState: {
    ticket: null,
    fetchTicket: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTicketState: (state) => {
      state.loading = false;
      state.error = null;
      state.ticket = null;
      state.fetchTicket = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Tickets
      .addCase(getTicketsForArchitect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicketsForArchitect.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchTicket = action.payload; // Update fetchTicket array
      })
      .addCase(getTicketsForArchitect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getArchitectTicketsWithReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArchitectTicketsWithReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.ticket = action.payload; // Update fetchTicket array
      })
      .addCase(getArchitectTicketsWithReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTicketState } = ticketSlice.actions;
export default ticketSlice.reducer;
