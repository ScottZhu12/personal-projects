import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addNewPost } from '../../features/postsSlice';

const AddPostForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [content, setContent] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const canSave =
    [title, userId, content].every(Boolean) && addRequestStatus === 'idle';

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
    setUserId('');
    setContent('');
  };

  return (
    <div className='add-post-form'>
      <h2>Add a New Post</h2>

      <form className='post-form'>
        <div className='post-form__field'>
          <label htmlFor='postTitle'>Post Title:</label>
          <input
            id='postTitle'
            name='postTitle'
            type='text'
            value={title}
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
