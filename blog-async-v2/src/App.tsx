import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import PostsList from './components/PostsList';
import { fetchPosts } from './features/postsSlice';
import { fetchUsers } from './features/usersSlice';
import { useAppDispatch } from './app/hooks';
import SinglePostPage from './components/SinglePostPage';
import Layout from './components/Layout';
import AddPostForm from './components/AddPostForm';
import EditPostForm from './components/EditPostForm';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PostsList />} />

          <Route path='post'>
            <Route index element={<AddPostForm />} />
            <Route path=':postId' element={<SinglePostPage />} />
            <Route path='edit/:postId' element={<EditPostForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
