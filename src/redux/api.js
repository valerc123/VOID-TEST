import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const valorantUrl = 'https://api.henrikdev.xyz/valorant/v2/leaderboard/';
const postsUrl =  'https://6396aee2a68e43e41808fa18.mockapi.io/api/';

export const apiSlice = createApi({
  reducerPath: 'api',
  endpoints: (builder) => ({
    getLeaderBoard: builder.query({
      query: (region) => `valorant/v2/leaderboard/${region}`,
      baseQuery: fetchBaseQuery({ baseUrl: valorantUrl })
    }),
    getMatchesPlayer: builder.query({
      query: ({region, gamename, tag}) => `valorant/v3/matches/${region}/${gamename}/${tag}`,
      baseQuery: fetchBaseQuery({ baseUrl: valorantUrl })
    }),
    getPosts: builder.query({
      query: () => `/posts`,
      baseQuery: fetchBaseQuery({ baseUrl: postsUrl })
    }),
  }),
});

export const { useGetLeaderBoardQuery, useGetMatchesPlayerQuery, useGetPostsQuery } = apiSlice;
