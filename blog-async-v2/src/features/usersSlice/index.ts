import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import jsonPlaceholderApi from '../../apis/jsonPlaceholderApi';

type FetchedUsersAddressType = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

type FetchedUsersCompanyType = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type FetchedUsersType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: FetchedUsersAddressType;
  phone: string;
  website: string;
  company: FetchedUsersCompanyType;
};

type GetUsersResponse = {
  data: FetchedUsersType[];
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const res = await jsonPlaceholderApi.get<GetUsersResponse>('/users');

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.message;
    }

    console.error('An unknown error occurred', err);
  }
});

const initialState: FetchedUsersType[] = [];

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
