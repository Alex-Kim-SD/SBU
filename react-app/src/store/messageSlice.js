// SBU/react-app/src/store/messageSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks
export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (debateId) => {
  const res = await fetch(`/api/messages/${debateId}`);
  const data = await res.json();
  return data;
});

// Initial State
const initialState = {
  messages: [],
  loading: false,
  error: null,
};

// Slice
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.messages = payload;
      })
      .addCase(fetchMessages.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || 'Failed to fetch messages.';
        state.messages = [];
      });
  },
});

// Reducer
export default messageSlice.reducer;
