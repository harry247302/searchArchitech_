import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL logic
const BASE_URL =
  process.env.NEXT_PUBLIC_MODE === "DEV"
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL;

export const addProject = createAsyncThunk(
  'projects/addProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/projects/create/`,
        projectData,
        {
          withCredentials: true,
          headers: {
            // DO NOT set Content-Type manually when using FormData
            // 'Content-Type': 'multipart/form-data' ❌ (let axios handle this)
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to add project'
      );
    }
  }
);



export const delete_projects_by_architect = createAsyncThunk(
  'projects/get_projects_by_architect',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/projects/delete/${id}`,
        { withCredentials: true }
      );
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch projects'
      );
    }
  }
);




export const get_projects_by_architect = createAsyncThunk(
  'projects/get_projects_by_architect',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/projects/fetchByArchitect`,
        { withCredentials: true }
      );
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch projects'
      );
    }
  }
);




const initialState = {
  projects: [],       // list of projects for get_projects_by_architect
  addedProject: null, // newly added project for addProject
  loadingAdd: false,
  loadingFetch: false,
  errorAdd: null,
  errorFetch: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // addProject
      .addCase(addProject.pending, (state) => {
        state.loadingAdd = true;
        state.errorAdd = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.addedProject = action.payload;
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loadingAdd = false;
        state.errorAdd = action.payload || 'Failed to add project';
      })

      // get_projects_by_architect
      .addCase(get_projects_by_architect.pending, (state) => {
        state.loadingFetch = true;
        state.errorFetch = null;
      })
      .addCase(get_projects_by_architect.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.projects = action.payload;
      })
      .addCase(get_projects_by_architect.rejected, (state, action) => {
        state.loadingFetch = false;
        state.errorFetch = action.payload || 'Failed to fetch projects';
      });
  },
});

export default projectSlice.reducer;

