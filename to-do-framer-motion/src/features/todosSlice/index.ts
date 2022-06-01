import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { checkLocalStorage } from '../../app/data';
import { TodosListType } from '../../types';

const getInitialState = () => {
  checkLocalStorage();
  let data: TodosListType[] = [];

  try {
    const res = localStorage.getItem('todoList');

    if (res) {
      data = [...JSON.parse(res)];
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

const initialState = {
  todoList: getInitialState(),
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<TodosListType>) => {
        if (state.todoList) {
          state.todoList.push(action.payload);
        }

        try {
          localStorage.setItem('todoList', JSON.stringify(state.todoList));
        } catch (err) {
          console.error(err);
        }
      },
      prepare: (newTodo: TodosListType) => {
        return {
          payload: newTodo,
        };
      },
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
