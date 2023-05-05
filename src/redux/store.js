import { configureStore  } from "@reduxjs/toolkit";
import { apiSlice } from './api';
import { apiPostsSlice } from './posts/api';

export const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      [apiPostsSlice.reducerPath]: apiPostsSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apiPostsSlice.middleware)
});