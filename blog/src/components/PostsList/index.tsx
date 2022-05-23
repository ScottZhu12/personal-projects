import React from 'react';

import { useAppSelector } from '../../app/hooks';
import PostAuthor from '../PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';

const PostsList: React.FC = () => {
  const posts = useAppSelector((state) => state.posts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => {
    return (
      <article key={post.id} className='posts-list__item'>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </article>
    );
  });

  return (
    <div className='posts-list'>
      <h2>Posts</h2>
      <div className='posts-list__container'>{renderedPosts}</div>
    </div>
  );
};

export default PostsList;
