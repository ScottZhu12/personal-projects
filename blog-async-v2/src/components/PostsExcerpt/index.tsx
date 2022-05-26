import React from 'react';
import { Link } from 'react-router-dom';

import PostsAuthor from '../PostsAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';
import { renderedPostsProps } from '../../features/postsSlice';

interface PostsExcerptProps {
  post: renderedPostsProps;
}

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <div className='posts-excerpt'>
      <article className='posts-list__item'>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 75)}...</p>
        <div className='post-detail-link'>
          <Link to={`post/${post.id}`}>View Post</Link>
        </div>
        <PostsAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </article>
    </div>
  );
};

export default PostsExcerpt;
