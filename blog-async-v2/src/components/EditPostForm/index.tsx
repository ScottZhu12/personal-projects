import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { updatePost, deletePost } from '../../features/postsSlice';

const EditPostForm: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const users = useAppSelector((state) => state.users);
  const activePost = posts.find((post) => post.id === Number(postId));

  const [title, setTitle] = useState(activePost?.title || '');
  const [content, setContent] = useState(activePost?.body || '');
  const [userId, setUserId] = useState(String(activePost?.userId) || '');
  const [requestStatus, setRequestStatus] = useState('idle');

  if (!activePost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onAuthorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const canSave =
    [title, userId, content].every(Boolean) && requestStatus === 'idle';

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(
          updatePost({
            id: activePost.id,
            title,
            body: content,
            userId,
            reactions: activePost.reactions,
          })
        ).unwrap();

        setTitle('');
        setUserId('');
        setContent('');
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error('Failed to update the post', err);
      } finally {
        setRequestStatus('idle');
      }
    }
  };

  const usersOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const onDeletePostClicked = () => {
    try {
      setRequestStatus('pending');
      dispatch(deletePost({ id: activePost.id })).unwrap();

      setTitle('');
      setUserId('');
      setContent('');
      navigate('/');
    } catch (err) {
      console.error('Failed to delete the post', err);
    } finally {
      setRequestStatus('idle');
    }
  };

  return (
    <div className='edit-post-form'>
      <h2>Edit Post</h2>

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
            defaultValue={userId}
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

        <button
          className='btn-delete'
          type='button'
          onClick={onDeletePostClicked}
          disabled={!canSave}
        >
          Delete Post
        </button>
      </form>
    </div>
  );
};

export default EditPostForm;
