// SBU/react-app/src/store/botSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks
export const selectBot = createAsyncThunk('bot/selectBot', async (botId) => {
  return botId;
});

export const fetchBot = createAsyncThunk('bot/fetchBot', async (botId) => {
  const res = await fetch(`/api/bots/${botId}`);
  const data = await res.json();
  return data;
});

export const fetchBots = createAsyncThunk('bot/fetchBots', async () => {
  const res = await fetch('/api/bots');
  const data = await res.json();
  return data;
});

export const fetchAllBots = createAsyncThunk('bot/fetchAllBots', async () => {
  const res = await fetch('/api/bots/all');
  const data = await res.json();
  return data;
});

export const fetchOtherBots = createAsyncThunk('bot/fetchOtherBots', async () => {
  const res = await fetch('/api/bots/all-ex');
  const data = await res.json();
  return data;
});

export const addBot = createAsyncThunk('bot/addBot', async (bot) => {
  const res = await fetch('/api/bots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bot)
  });
  const data = await res.json();
  return data;
});

export const editBot = createAsyncThunk('bot/editBot', async ({ botId, bot }) => {
  const res = await fetch(`/api/bots/${botId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bot)
  });
  const data = await res.json();
  return data;
});

export const deleteBot = createAsyncThunk('bot/deleteBot', async (botId) => {
  const res = await fetch(`/api/bots/${botId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    return botId;
  } else {
    throw new Error('Failed to delete bot');
  }
});

// Initial State
const initialState = {
  your_bots: {},
  other_bots: {},
  selectedBot: null,
};
// Slice
const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(selectBot.fulfilled, (state, { payload }) => {
        state.selectedBot = payload;
      })
      .addCase(fetchBot.fulfilled, (state, { payload }) => {
        state.your_bots[payload.id] = payload;
        state.other_bots[payload.id] = payload;
      })
      .addCase(fetchBots.fulfilled, (state, { payload }) => {
        state.your_bots = {};
        if (Array.isArray(payload)) {
          payload.forEach(bot => state.your_bots[bot.id] = bot);
        }
      })
      .addCase(fetchAllBots.fulfilled, (state, { payload }) => {
        state.your_bots = {};
        state.other_bots = {};
        if (Array.isArray(payload)) {
          payload.forEach(bot => {
            state.your_bots[bot.id] = bot;
            state.other_bots[bot.id] = bot;
          });
        }
      })
      .addCase(fetchOtherBots.fulfilled, (state, { payload }) => {
        state.other_bots = {};
        if (Array.isArray(payload)) {
          payload.forEach(bot => state.other_bots[bot.id] = bot);
        }
      })
      .addCase(addBot.fulfilled, (state, { payload }) => {
        state.your_bots[payload.id] = payload;
        state.other_bots[payload.id] = payload;
        state.selectedBot = payload.id;
      })
      .addCase(editBot.fulfilled, (state, { payload }) => {
        state.your_bots[payload.id] = payload;
        state.other_bots[payload.id] = payload;
      })
      .addCase(deleteBot.fulfilled, (state, { payload }) => {
        delete state.your_bots[payload];
        delete state.other_bots[payload];
      });
  }
});

// Reducer
export default botSlice.reducer;
