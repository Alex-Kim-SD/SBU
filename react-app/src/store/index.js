import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import session from './session';
import bots from './botSlice';
import convSettings from './convSettingsSlice';
import loading from './loadingSlice';
import conversation from './convSlice';
import debate from './debateSlice';
import message from './messageSlice';

const rootReducer = combineReducers({
  session,
  bots,
  convSettings,
  loading,
  conversation,
  debate,
  message,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const middlewares = [thunk, logger];
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;
  enhancer = compose(applyMiddleware(...middlewares), devTools);
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
