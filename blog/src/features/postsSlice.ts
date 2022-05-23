import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

export interface ReactionsProps {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface PostType {
  id: string;
  title: string;
  content: string;
  date: string;
  reactions: ReactionsProps;
  userId?: string;
}

const initialState: PostType[] = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: `I've heard good things.`,
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostType>) => {
        state.push(action.payload);
      },
      prepare: (title: string, content: string, userId: string) => {
        const id = nanoid();
        const date = new Date().toISOString();
        const reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };

        return {
          payload: {
            id,
            title,
            content,
            date,
            reactions,
            userId,
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);

      if (existingPost) {
        const { reactions } = existingPost;
        reactions[reaction as keyof ReactionsProps]++;
      }
    },
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
