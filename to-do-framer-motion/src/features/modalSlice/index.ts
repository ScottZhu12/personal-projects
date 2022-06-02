import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type modalState = {
  addShow: boolean;
  updateShow: boolean;
};

const initialState: modalState = {
  addShow: false,
  updateShow: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addModalShow: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.addShow = action.payload;
      },
      prepare: (toggle: boolean) => {
        return {
          payload: toggle,
        };
      },
    },
    updateModalShow: {
      reducer: (state, action: PayloadAction<boolean>) => {
        state.updateShow = action.payload;
      },
      prepare: (toggle: boolean) => {
        return {
          payload: toggle,
        };
      },
    },
  },
});

export const { addModalShow, updateModalShow } = modalSlice.actions;

export default modalSlice.reducer;
