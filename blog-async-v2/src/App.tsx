import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import PostsList from './components/PostsList';
import { fetchUsers } from './features/usersSlice';
import { useAppDispatch } from './app/hooks';
import SinglePostPage from './components/SinglePostPage';
import Layout from './components/Layout';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostsList />}>
            <Route path='post'></Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
