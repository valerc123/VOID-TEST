import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.henrikdev.xyz/` }),
  endpoints: (builder) => ({
    getLeaderBoard: builder.query({
      query: (region) => `valorant/v2/leaderboard/${region}`,
    }),
    getMatchesPlayer: builder.query({
      query: ({region, gamename, tag}) => `valorant/v3/matches/${region}/${gamename}/${tag}`,
    })
  }),
});

export const { useGetLeaderBoardQuery, useGetMatchesPlayerQuery} = apiSlice;
