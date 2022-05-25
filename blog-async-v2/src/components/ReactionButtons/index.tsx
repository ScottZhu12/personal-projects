import React from 'react';

import {
  renderedPostsProps,
  reactionAdded,
  PostsReactionsProps,
} from '../../features/postsSlice';
import { useAppDispatch } from '../../app/hooks';

interface ReactionButtonsProps {
  post: renderedPostsProps;
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

  const renderedReactionButtons = Object.entries(reactionEmoji).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type='button'
          className='reaction-button'
          onClick={() => {
            dispatch(reactionAdded({ postId: post.id, reaction: name }));
          }}
        >
          {emoji} {post.reactions[name as keyof PostsReactionsProps]}
        </button>
      );
    }
  );

  return <div className='reaction-buttons'>{renderedReactionButtons}</div>;
};

export default ReactionButtons;
