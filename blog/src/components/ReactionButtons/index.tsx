import React from 'react';

import { useAppDispatch } from '../../app/hooks';
import {
  PostType,
  ReactionsProps,
  reactionAdded,
} from '../../features/postsSlice';

interface ReactionButtonsProps {
  post: PostType;
}

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😲',
  heart: '💖',
  rocket: '🚀',
  coffee: '☕',
};

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const renderedButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type='button'
        className='reaction-button'
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as keyof ReactionsProps]}
      </button>
    );
  });

  return <div className='reaction-buttons'>{renderedButtons}</div>;
};

export default ReactionButtons;
