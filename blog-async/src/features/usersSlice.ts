import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import usersApi from '../apis/usersApi';

type UsersAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type UsersCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UsersAddress;
  phone: string;
  website: string;
  company: UsersCompany;
};

type GetUsersResponse = {
  data: Users[];
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const res = await usersApi.get<GetUsersResponse>('/users');

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.message;
    }

    return 'An unexpected error occurred';
  }
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const users = action.payload;

      if (!Array.isArray(users)) {
        return;
      }

      return users;
    });
  },
});

export default usersSlice.reducer;
