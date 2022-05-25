import React from 'react';

import { useAppSelector } from '../../app/hooks';

interface PostsAuthorProps {
  userId: number;
}

const PostsAuthor: React.FC<PostsAuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.users);

  const author = users.find((user) => user.id === userId);

  return (
    <div className='posts-author'>
      by {author ? author.name : 'Unknown author'}
    </div>
  );
};

export default PostsAuthor;
