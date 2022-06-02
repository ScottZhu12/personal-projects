import React from 'react';
import { Toaster } from 'react-hot-toast';

import PageTitle from './components/PageTitle';
import Header from './components/Header';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <>
      <div className='app'>
        <PageTitle />
        <Header />
        <TodoList />
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          },
        }}
      />
    </>
  );
};

export default App;
