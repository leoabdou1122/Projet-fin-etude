import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk action to fetch user data
export const fetchAdminAuth = createAsyncThunk(
  'auth/fetchAdminAuth', async () => {
    try {
      const response = await axios.get('http://localhost:3001/admin/auth', { withCredentials: true });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAdminAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
