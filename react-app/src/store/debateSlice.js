// SBU/react-app/src/store/debateSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk
export const fetchDebate = createAsyncThunk('debate/fetchDebate', async (debateId) => {
  try {
    const response = await fetch(`/api/debates/${debateId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch debate');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Initial State
const initialState = {
  debate: null,
  error: null,
  isLoading: false,
};

// Slice
const debateSlice = createSlice({
  name: 'debate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDebate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.debate = action.payload;
      })
      .addCase(fetchDebate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators and reducer
export default debateSlice.reducer;
export const {} = debateSlice.actions;
