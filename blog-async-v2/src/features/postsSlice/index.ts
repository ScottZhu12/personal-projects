import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

import jsonPlaceholderApi from '../../apis/jsonPlaceholderApi';

type FetchedPostsType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type GetPostsResponse = {
  data: FetchedPostsType[];
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await jsonPlaceholderApi.get<GetPostsResponse>('/posts');

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.message;
    }

    return 'An unknown error occurred';
  }
});

type NewPostType = {
  title: string;
  body: string;
  userId: string;
};

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: NewPostType) => {
    try {
      const res = await jsonPlaceholderApi.post<renderedPostsProps>(
        '/posts',
        initialPost
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.message;
      }

      return 'An unknown error occurred';
    }
  }
);

interface UpdatedPostProps {
  id: number;
  title: string;
  body: string;
  userId: string;
  reactions: PostsReactionsProps;
}

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost: UpdatedPostProps) => {
    const { id } = initialPost;

    try {
      const res = await jsonPlaceholderApi.put<renderedPostsProps>(
        `/posts/${id}`,
        initialPost
      );

      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.message;
      }

      return 'An unknown error occurred';
    }
  }
);

interface DeletedPostProps {
  id: number;
}

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (initialPost: DeletedPostProps) => {
    const { id } = initialPost;

    try {
      const res = await jsonPlaceholderApi.delete<renderedPostsProps>(
        `/posts/${id}`
      );

      if (res.status === 200) {
        return initialPost;
      }

      return `${res.status}: ${res.statusText}`;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err.message;
      }

      return 'An unknown error occurred';
    }
  }
);

export interface PostsReactionsProps {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
}

export interface renderedPostsProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  date: string;
  reactions: PostsReactionsProps;
}

interface PostsStateProps {
  posts: renderedPostsProps[];
  status: string;
  error: string | null;
}

const initialState: PostsStateProps = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const activePost = state.posts.find((post) => post.id === postId);

      if (activePost) {
        const { reactions } = activePost;
        reactions[reaction as keyof PostsReactionsProps]++;
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
        const errorMessage = action.error.message || 'unknown error occurred';

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
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        action.payload.userId = Number(action.payload.userId);
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (typeof action.payload === 'string') {
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }

        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
