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
  yourDebates: [],
  otherDebates: [],
  error: null,
  isLoading: false,
};

// fetch thunk
export const fetchAllDebates = createAsyncThunk('debate/fetchAllDebates', async (userId) => {
  try {
    const response = await fetch('/api/debates');
    if (!response.ok) {
      throw new Error('Failed to fetch debates');
    }
    const data = await response.json();
    return { debates: data, userId };
  } catch (error) {
    throw new Error(error.message);
  }
});

// delete thunk
export const deleteDebate = createAsyncThunk('debate/deleteDebate', async (debateId) => {
  try {
    const response = await fetch(`/api/debates/${debateId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete debate');
    }
    return debateId; // return the deleted debateId
  } catch (error) {
    throw new Error(error.message);
  }
});


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
      })
      .addCase(fetchAllDebates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllDebates.fulfilled, (state, action) => {
        state.isLoading = false;
        const { debates, userId } = action.payload;
        state.yourDebates = debates.filter(debate => debate.owner_id === userId);
        state.otherDebates = debates.filter(debate => debate.owner_id !== userId);
      })
      .addCase(fetchAllDebates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      //delete cases:
      .addCase(deleteDebate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDebate.fulfilled, (state, action) => {
        state.isLoading = false;
        const debateId = action.payload;
        state.yourDebates = state.yourDebates.filter(debate => debate.id !== debateId);
        state.otherDebates = state.otherDebates.filter(debate => debate.id !== debateId);
      })
      .addCase(deleteDebate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators and reducer
export default debateSlice.reducer;
export const {} = debateSlice.actions;
