import { IconButton, Box } from '@chakra-ui/react'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useCallback } from 'react'

import { PlaylitsProps } from '../types/Playlist'

import useClientColor from '../hooks/useClientColor'

import PageLayout from '../components/layouts/PageLayout'
import PlaylistHeader from '../components/playlist/PlaylistHeader'
import SongsTable from '../components/ui/table/SongsTable'

import { useAppDispatch } from '../redux/store'
import {
  PlayerbarActions,
  PlayerbarSelect,
} from '../redux/features/playerbarSlice'
import { playlistApi } from '../redux/services/playlist.service'

const Playlits = ({ playlist }: PlaylitsProps) => {
  const color = useClientColor()
  const dispatch = useAppDispatch()
  const isPlaying = useSelector(PlayerbarSelect.isPlaying)
  const playlistId = useSelector(PlayerbarSelect.playlistId)

  const handleSongClick = useCallback(
    async (id: number) => {
      if (playlistId !== playlist.id) {
        await dispatch(
          playlistApi.endpoints.getPlayListById.initiate(playlist.id)
        )
      }
      dispatch(PlayerbarActions.setActiveSong(id))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playlistId, playlist.id]
  )

  const handleClick = async () => {
    if (playlistId !== playlist.id) {
      await dispatch(
        playlistApi.endpoints.getPlayListById.initiate(playlist.id)
      )
      dispatch(PlayerbarActions.startPlaySong())
    } else {
      dispatch(PlayerbarActions.setIsPlaying())
    }
  }

  return (
    <PageLayout
      gradient={color}
      headerComponent={
        <PlaylistHeader
          gradient={color}
          subtitle="playlist"
          title={playlist.name}
          description={`${playlist.songs.length} songs`}
          imageSrc={playlist.photo}
        />
      }
    >
      <Box background="transparent">
        <Box p="10px" mb="20px">
          <IconButton
            aria-label="play"
            icon={
              isPlaying && playlistId === playlist.id ? (
                <BsFillPauseFill fontSize="30px" />
              ) : (
                <BsFillPlayFill fontSize="30px" />
              )
            }
            colorScheme="green"
            size="lg"
            isRound
            onClick={handleClick}
          />
        </Box>
        <SongsTable songs={playlist.songs} onClick={handleSongClick} />
      </Box>
    </PageLayout>
  )
}

export default Playlits
