import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewPost } from '../../features/postsSlice';

const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }

    setTitle('');
    setContent('');
    setUserId('');
  };

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <div className='add-post-form'>
      <h2>Add a New Post</h2>

      <form className='post-form'>
        <div className='post-form__field'>
          <label htmlFor='postTitle'>Post Title:</label>
          <input
            value={title}
            id='postTitle'
            name='postTitle'
            type='text'
            onChange={onTitleChanged}
            autoComplete='off'
          />
        </div>

        <div className='post-form__field'>
          <label htmlFor='postAuthor'>Author:</label>
          <select
            name='postAuthor'
            id='postAuthor'
            value={userId}
            onChange={onAuthorChanged}
          >
            <option value=''></option>
            {usersOptions}
          </select>
        </div>

        <div className='post-form__field'>
          <label htmlFor='postContent'>Content:</label>
          <textarea
            name='postContent'
            id='postContent'
            value={content}
            onChange={onContentChanged}
          ></textarea>
        </div>

        <button type='button' onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
