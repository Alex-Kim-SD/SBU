// SBU/react-app/src/store/convSettingsSlice.js

// Initial State
// Initial State
const initialState = {
  settings: {},
};


// Action Types
const GET_SETTINGS = 'settings/GET_SETTINGS';
const GET_SETTING = 'settings/GET_SETTING';
const CREATE_SETTING = 'settings/CREATE_SETTING';
const UPDATE_SETTING = 'settings/UPDATE_SETTING';
const DELETE_SETTING = 'settings/DELETE_SETTING';

// Action Creators
const getSettings = (settings) => ({ type: GET_SETTINGS, settings });
const getSetting = (setting) => ({ type: GET_SETTING, setting });
const createSetting = (setting) => ({ type: CREATE_SETTING, setting });
const updateSetting = (setting) => ({ type: UPDATE_SETTING, setting });
const removeSetting = (settingId) => ({ type: DELETE_SETTING, settingId });

// Thunks
export const fetchSetting = (settingId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/settings/${settingId}`);
    const data = await res.json();
    dispatch(getSetting(data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchSettings = () => async (dispatch) => {
  try {
    const res = await fetch('/api/settings');
    const data = await res.json();
    dispatch(getSettings(data));
  } catch (err) {
    console.error(err);
  }
};

export const addSetting = (setting) => async (dispatch) => {
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(setting),
    });
    const data = await res.json();
    dispatch(createSetting(data));
  } catch (err) {
    console.error(err);
  }
};

export const editSetting = (settingId, setting) => async (dispatch) => {
  try {
    const res = await fetch(`/api/settings/${settingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(setting),
    });
    const data = await res.json();
    dispatch(updateSetting(data));
    return data;
  } catch (err) {
    console.error(err);
  }
};


export const deleteSetting = (settingId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/settings/${settingId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      dispatch(removeSetting(settingId));
    } else {
      console.error('Failed to delete setting');
    }
  } catch (err) {
    console.error(err);
  }
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_SETTINGS: {
      const settingObjects = action.settings.reduce((obj, setting) => {
        obj[setting.id] = setting;
        return obj;
      }, {});
      return { ...state, ...settingObjects };
    }
    case GET_SETTING:
    case CREATE_SETTING: {
      return { ...state, [action.setting.id]: action.setting };
    }
    case UPDATE_SETTING: {
      return { ...state, [action.setting.id]: action.setting };
    }
    case DELETE_SETTING:
      const newState = { ...state };
      delete newState[action.settingId];
      return newState;
    default:
      return state;
  }
}
