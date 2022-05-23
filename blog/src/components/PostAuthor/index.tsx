import React from 'react';

import { useAppSelector } from '../../app/hooks';

interface PostAuthorProps {
  userId: string | undefined;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ userId }) => {
  const users = useAppSelector((state) => state.users);

  const author = users.find((user) => user.id === userId);

  return (
    <div className='post-author'>
      by {author ? author.name : 'Unknown author'}
    </div>
  );
};

export default PostAuthor;
