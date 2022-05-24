import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import postsReducer from '../features/postsSlice';
import usersReducer from '../features/usersSlice';

const rootReducers = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: rootReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
