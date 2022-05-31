import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

import { TodosListType, TodosStateProps } from '../../types';
import { todoTable } from '../../app/data';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const res = (await todoTable.getItem('todosList')) || [];

    return res;
  } catch (err) {
    console.error(err);
  }
});

export const addNewTodo = createAsyncThunk(
  'todos/addTodos',
  async (newPost: TodosListType) => {
    try {
      const currentTodos = await todoTable.getItem('todosList');

      if (Array.isArray(currentTodos)) {
        currentTodos.push(newPost);
        await todoTable.setItem('todosList', currentTodos);
      }

      return newPost;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState: TodosStateProps = {
  todosList: [],
  status: 'idle',
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const fetchedTodos = action.payload;

        if (Array.isArray(fetchedTodos)) {
          state.todosList = state.todosList.concat(fetchedTodos);
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        const errorMessage = action.error.message || 'unknown error occurred';

        state.error = errorMessage;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        const newTodo = action.payload;

        if (Array.isArray(newTodo)) {
          state.todosList.push(newTodo);
        }
      });
  },
});

export default todosSlice.reducer;
