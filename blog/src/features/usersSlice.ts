import { createSlice } from '@reduxjs/toolkit';

interface usersState {
  id: string;
  name: string;
}

const initialState: usersState[] = [
  { id: '0', name: 'Dude Lebowski' },
  { id: '1', name: 'Neil Young' },
  { id: '2', name: 'Dave Gray' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
