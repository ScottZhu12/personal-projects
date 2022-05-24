import React from 'react';

import PostAuthor from '../PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';
import { PostType } from '../../features/postsSlice';

interface PostsExcerptProps {
  post: PostType;
}

const PostsExcerpt: React.FC<PostsExcerptProps> = ({ post }) => {
  return (
    <div className='posts-excerpt'>
      <article className='posts-list__item'>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </article>
    </div>
  );
};

export default PostsExcerpt;
