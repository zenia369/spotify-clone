import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../types/Store'

import PlayerbarSlice from './features/playerbarSlice'

import { playlistApi } from './services/playlist.service'

export const store = () =>
  configureStore({
    reducer: {
      playerbar: PlayerbarSlice,
      [playlistApi.reducerPath]: playlistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(playlistApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const storeWrapper = createWrapper(store)
