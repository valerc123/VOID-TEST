import { configureStore  } from "@reduxjs/toolkit";
import { apiPostsSlice } from './api';

export const store = configureStore({
    reducer: {
      [apiPostsSlice.reducerPath]: apiPostsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPostsSlice.middleware)
});