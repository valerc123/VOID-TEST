import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiPostsSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `https://6396aee2a68e43e41808fa18.mockapi.io/api` }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/posts`,
    }),
    getPostsId: builder.query({
        query: (id) => `/posts/${id}`,
    })
  }),
});

export const { useGetPostsQuery, useGetPostsIdQuery } = apiPostsSlice;