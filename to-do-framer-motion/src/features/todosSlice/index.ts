import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

import { checkLocalStorage } from '../../app/data';
import type { TodosListType, newTodoType, updateTodoType } from '../../types';

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
      prepare: (newTodo: newTodoType) => {
        const id = nanoid();
        const { title, status } = newTodo;
        const time = new Date().toISOString();

        return {
          payload: {
            id,
            title,
            status,
            time,
          },
        };
      },
    },
    deleteTodo: {
      reducer: (state, action: PayloadAction<string>) => {
        try {
          const res = localStorage.getItem('todoList');

          if (res) {
            const todoList = JSON.parse(res);
            const filteredTodoList = todoList.filter(
              (todo: TodosListType) => todo.id !== action.payload
            );

            localStorage.setItem('todoList', JSON.stringify(filteredTodoList));
            state.todoList = [...filteredTodoList];
          }
        } catch (err) {
          console.error(err);
        }
      },
      prepare: (todo: TodosListType) => {
        const { id } = todo;

        return {
          payload: id,
        };
      },
    },
    updateTodo: {
      reducer: (state, action: PayloadAction<TodosListType>) => {
        try {
          const { id } = action.payload;
          const res = localStorage.getItem('todoList');

          if (res) {
            const todoList = JSON.parse(res);
            const filteredTodoList = todoList.filter(
              (todo: TodosListType) => todo.id !== id
            );

            localStorage.setItem(
              'todoList',
              JSON.stringify([...filteredTodoList, action.payload])
            );
            state.todoList = [...filteredTodoList, action.payload];
          }
        } catch (err) {
          console.error(err);
        }
      },
      prepare: (todo: updateTodoType) => {
        const { id, title, status } = todo;
        const time = new Date().toISOString();

        return {
          payload: {
            id,
            title,
            status,
            time,
          },
        };
      },
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
