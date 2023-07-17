// SBU/react-app/src/store/botSlice.js

// Initial State
const initialState = {};

// Action Types
const GET_BOTS = 'bots/GET_BOTS';
const GET_BOT = 'bots/GET_BOT';
const CREATE_BOT = 'bots/CREATE_BOT';
const UPDATE_BOT = 'bots/UPDATE_BOT';
const DELETE_BOT = 'bots/DELETE_BOT';

// Action Creators
const getBots = (bots) => ({ type: GET_BOTS, bots });
const getBot = (bot) => ({ type: GET_BOT, bot });
const createBot = (bot) => ({ type: CREATE_BOT, bot });
const updateBot = (bot) => ({ type: UPDATE_BOT, bot });
const removeBot = (botId) => ({ type: DELETE_BOT, botId });

// Thunks
export const fetchBot = (botId) => async dispatch => {
  try {
    const res = await fetch(`/api/bots/${botId}`);
    const data = await res.json();
    dispatch(getBot(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchBots = () => async dispatch => {
  try {
    const res = await fetch('/api/bots');
    const data = await res.json();
    dispatch(getBots(data));
  } catch (err) {
    console.error(err);
  }
};

export const addBot = (bot) => async dispatch => {
  try {
    const res = await fetch('/api/bots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bot)
    });
    const data = await res.json();
    dispatch(createBot(data));
  } catch (err) {
    console.error(err);
  }
};

export const editBot = (botId, bot) => async dispatch => {
  try {
    const res = await fetch(`/api/bots/${botId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bot)
    });
    const data = await res.json();
    dispatch(updateBot(data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteBot = (botId) => async dispatch => {
  try {
    const res = await fetch(`/api/bots/${botId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      dispatch(removeBot(botId));
    } else {
      console.error('Failed to delete bot');
    }
  } catch (err) {
    console.error(err);
  }
};



// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOTS: {
      const botObjects = action.bots.reduce((obj, bot) => {
        obj[bot.id] = bot;
        return obj;
      }, {});
      return { ...state, ...botObjects };
    }
    case GET_BOT:
    case CREATE_BOT: {
      return { ...state, [action.bot.id]: action.bot };
    }
    case UPDATE_BOT: {
      return { ...state, [action.bot.id]: action.bot };
    }
    case DELETE_BOT:
      const newState = { ...state };
      delete newState[action.botId];
      return newState;
    default:
      return state;
  }
}
