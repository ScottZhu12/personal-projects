import React from 'react';

import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';

const App: React.FC = () => {
  return (
    <div className='app'>
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default App;
