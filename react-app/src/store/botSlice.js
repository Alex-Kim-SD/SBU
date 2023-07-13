import { createSlice } from 'redux';

const initialState = {
    bots: [],
    error: null,
  };

  const botSlice = createSlice({
    name: 'bot',
    initialState,
    reducers: {
      setBots: (state, action) => {
        state.bots = action.payload;
        state.error = null;
      },
      setError: (state, action) => {
        state.error = action.payload;
      },
    },
  });

  export const { setBots, setError } = botSlice.actions;
