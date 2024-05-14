import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk action to fetch user data
export const fetchAuthData = createAsyncThunk(
  'auth/fetchAuthData', async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/authentication', { withCredentials: true });
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
      .addCase(fetchAuthData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAuthData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
