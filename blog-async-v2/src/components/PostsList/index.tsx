import React from 'react';

import { useAppSelector } from '../../app/hooks';

import PostsExcerpt from '../PostsExcerpt';

const PostsList: React.FC = () => {
  const posts = useAppSelector((state) => state.posts.posts);
  const postsStatus = useAppSelector((state) => state.posts.status);
  const postsError = useAppSelector((state) => state.posts.error);

  let content;

  if (postsStatus === 'loading') {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map((post) => {
      return <PostsExcerpt key={post.title} post={post} />;
    });
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>;
  }

  return (
    <div className='posts-list'>
      <div className='posts-list__container'>{content}</div>
    </div>
  );
};

export default PostsList;
