import { User } from '@prisma/client'
import useSWR from 'swr'

import { ApiClient } from '../lib/api.client'
import { PlaylistType } from '../types/Playlist'

export const useMe = () => {
  const { data, error, isLoading } = useSWR<User & { playlistCount: number }>(
    '/user/me',
    ApiClient.get
  )

  return {
    user: data,
    error,
    isLoading,
  }
}

export const usePlaylist = () => {
  const { data, error, isLoading } = useSWR<PlaylistType[]>(
    '/playlist',
    ApiClient.get
  )

  return {
    playlist: data,
    error,
    isLoading,
  }
}
