import React, { useEffect } from 'react';

import PageTitle from './components/PageTitle';
import Header from './components/Header';
import TodoList from './components/TodoList';
import { useAppDispatch } from './app/hooks';
import { fetchTodos } from './features/todosSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className='app'>
      <PageTitle />
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
