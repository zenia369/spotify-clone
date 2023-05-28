import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { Song } from '@prisma/client'
import { RootState } from '@/src/types/Store'
import { PlayListItemWithArtist } from '@/src/types/Playlist'

import { playlistApi } from '../services/playlist.service'

interface InitialState {
  playlist: PlayListItemWithArtist[]
  activeSong: null | Song | PlayListItemWithArtist
  playlistId: number
  isPlaying: boolean
  isLoading: boolean
}

const initialState: InitialState = {
  activeSong: null,
  playlist: [],
  playlistId: 0,
  isPlaying: false,
  isLoading: false,
}

export const playerbarSlice = createSlice({
  name: 'playerbar',
  initialState,
  reducers: {
    setActiveSong(state, action: PayloadAction<number>) {
      state.activeSong = state.playlist.find(
        (pl) => pl.id === action.payload
      ) as PlayListItemWithArtist
      state.isPlaying = true
    },
    setIsPlaying(state) {
      state.isPlaying = !state.isPlaying
    },
    startPlaySong(state) {
      if (state.isPlaying) {
        state.isPlaying = false
      } else {
        // eslint-disable-next-line prefer-destructuring
        state.activeSong = state.playlist[0]
        state.isPlaying = true
      }
    },
    setNextSong(state) {
      const idxCurrSong = state.playlist.findIndex(
        (pl) => pl.id === state.activeSong?.id
      )
      const nextSong = state.playlist[idxCurrSong + 1]
      state.activeSong = nextSong || state.playlist.at(0)
    },
    setPrevSong(state) {
      const idxCurrSong = state.playlist.findIndex(
        (pl) => pl.id === state.activeSong?.id
      )
      const nextSong = state.playlist[idxCurrSong - 1]
      state.activeSong = nextSong || state.playlist.at(-1)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type === HYDRATE,
      (state, action: PayloadAction<{ playerbar: InitialState }>) => {
        return {
          ...state,
          ...action.payload.playerbar,
        }
      }
    )
    builder
      .addMatcher(
        playlistApi.endpoints.getPlayListById.matchFulfilled,
        (state) => {
          state.isLoading = true
        }
      )
      .addMatcher(
        playlistApi.endpoints.getPlayListById.matchFulfilled,
        (state, action) => {
          state.playlist = action.payload.songs
          state.playlistId = action.meta.arg.originalArgs
          state.isLoading = false
        }
      )
  },
})

export const PlayerbarActions = playerbarSlice.actions
export default playerbarSlice.reducer

export namespace PlayerbarSelect {
  export const song = (state: RootState) => state.playerbar.activeSong

  export const playlist = (state: RootState) => state.playerbar.playlist

  export const isPlaying = (state: RootState) => state.playerbar.isPlaying

  export const showPlayerbar = (state: RootState) =>
    Boolean(state.playerbar.activeSong)

  export const isLoading = (state: RootState) => state.playerbar.isLoading

  export const playlistId = (state: RootState) => state.playerbar.playlistId
}
