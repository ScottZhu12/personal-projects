import React from 'react';

import PageTitle from './components/PageTitle';
import Header from './components/Header';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className='app'>
      <PageTitle />
      <Header />
      <TodoList />
    </div>
  );
};

export default App;
