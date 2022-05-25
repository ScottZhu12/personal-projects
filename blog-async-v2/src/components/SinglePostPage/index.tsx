import React from 'react';

import { useAppSelector } from '../../app/hooks';
import PostsAuthor from '../PostsAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';

const SinglePostPage: React.FC = () => {
  const posts = useAppSelector((state) => state.posts.posts);

  const activePost = posts.find((post) => post.id === postId);

  if (!activePost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className='single-post-page'>
      <article className='posts-list__item'>
        <h3>{activePost.title}</h3>
        <p>{activePost.body}</p>
        <PostsAuthor userId={activePost.userId} />
        <TimeAgo timestamp={activePost.date} />
        <ReactionButtons post={activePost} />
      </article>
    </div>
  );
};

export default SinglePostPage;
