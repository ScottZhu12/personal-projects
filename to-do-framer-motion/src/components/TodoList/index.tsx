import React from 'react';

import { useAppSelector } from '../../app/hooks';
import TodoItem from '../TodoItem';

const TodoList: React.FC = () => {
  const todoList = useAppSelector((state) => state.todo.todoList);
  let orderedTodoList;

  if (todoList && todoList.length > 0) {
    orderedTodoList = [...todoList];
    orderedTodoList.sort((a, b) => b.time.localeCompare(a.time));
  }

  let renderedTodoList;

  if (orderedTodoList) {
    renderedTodoList = orderedTodoList.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} />;
    });
  }

  return <main className='todo-list'>{renderedTodoList}</main>;
};

export default TodoList;
