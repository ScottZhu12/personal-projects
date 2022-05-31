import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type modalState = {
  show: boolean;
};

const initialState: modalState = {
  show: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalShow: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.show = action.payload;
      },
      prepare: (toggle: boolean) => {
        return {
          payload: toggle,
        };
      },
    },
  },
});

export const { modalShow } = modalSlice.actions;

export default modalSlice.reducer;
