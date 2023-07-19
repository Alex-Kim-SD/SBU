import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk
export const createConversation = createAsyncThunk('conversation/createConversation',async (conversationData) => {
    try {
      const response = await fetch('/api/conv_gen/create_conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(conversationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

// Initial State
const initialState = {
  conversation: null,
  error: null,
  isLoading: false,
};

// Slice
const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversation = action.payload;
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators and reducer
export default conversationSlice.reducer;
