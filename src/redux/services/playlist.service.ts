import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PlayListWithSongs } from '@/src/types/Playlist'

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/playlist' }),
  endpoints: (builder) => ({
    getPlayListById: builder.query<PlayListWithSongs, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
        providesTags: [{ type: 'PlayList', id }],
      }),
    }),
  }),
})

export const PlaylistApi = playlistApi
