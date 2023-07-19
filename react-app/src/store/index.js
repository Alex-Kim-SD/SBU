import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import session from './session';
import bots from './botSlice';
import convSettings from './convSettingsSlice';
import loading from './loadingSlice';
import conversation from './convSlice';
import debate from './debateSlice';
import message from './messageSlice'; // Add the message slice here

const rootReducer = combineReducers({
  session,
  bots,
  convSettings,
  loading,
  conversation,
  debate,
  message, // Include the message slice in the root reducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  enhancer = compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
