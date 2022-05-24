import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

import postsApi from '../apis/postsApi';

type Posts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type GetPostsResponse = {
  data: Posts[];
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await postsApi.get<GetPostsResponse>('/posts');

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.message;
    }

    return 'An unexpected error occurred';
  }
});

interface NewPostType {
  title: string;
  body: string;
  userId: string;
}

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: NewPostType) => {
    try {
      const res = await postsApi.post<PostType>('/posts', initialPost);

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.message;
      }

      return 'An unexpected error occurred';
    }
  }
);

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
  body: string;
  date: string;
  reactions: ReactionsProps;
  userId?: string | number;
}

interface StateProps {
  posts: PostType[];
  status: string;
  error: string | null;
}

const initialState: StateProps = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostType>) => {
        state.posts.push(action.payload);
      },
      prepare: (title: string, body: string, userId: string) => {
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
            body,
            date,
            reactions,
            userId,
          },
        };
      },
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);

      if (existingPost) {
        const { reactions } = existingPost;
        reactions[reaction as keyof ReactionsProps]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let min = 1;
        const fetchedPosts = action.payload;

        if (Array.isArray(fetchedPosts)) {
          const loadedPosts = fetchedPosts.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };

            return post;
          });

          state.posts = state.posts.concat(loadedPosts);
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        const errorMessage = action.error.message || 'unknown error';
        state.error = errorMessage;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const newPost = action.payload;

        if (typeof newPost !== 'string') {
          newPost.userId = Number(newPost.userId);
          newPost.date = new Date().toISOString();
          newPost.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          state.posts.push(newPost);
        }
      });
  },
});

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
