import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import counterReducer from '../features/counter/counterSlice';

const rootReducers = combineReducers({
  counter: counterReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
