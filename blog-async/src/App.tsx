import React, { useEffect } from 'react';

import PostsList from './components/PostsList';
import AddPostForm from './components/AddPostForm';
import { fetchUsers } from './features/usersSlice';
import { useAppDispatch } from './app/hooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className='app'>
      <AddPostForm />
      <PostsList />
    </div>
  );
};

export default App;
