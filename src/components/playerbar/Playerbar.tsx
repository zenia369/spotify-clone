import { useState, useRef, useEffect } from 'react'
import {
  Box,
  ButtonGroup,
  IconButton,
  Center,
  Flex,
  Text,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlineRepeat,
} from 'react-icons/md'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'

import ReactHowler from 'react-howler'
import { useDispatch, useSelector } from 'react-redux'

import {
  PlayerbarActions,
  PlayerbarSelect,
} from '@/src/redux/features/playerbarSlice'

import VolumeController from './components/VolumeController'
import SongController from './components/SongController'

const Playerbar = () => {
  const dispatch = useDispatch()
  const song = useSelector(PlayerbarSelect.song)
  const playlist = useSelector(PlayerbarSelect.playlist)
  const isPlaying = useSelector(PlayerbarSelect.isPlaying)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const [volume, setVolume] = useState(1)
  const [seek, setSeek] = useState(0.0)
  const howlerRef = useRef<ReactHowler | null>(null)
  const repeatRef = useRef(repeat)
  const shuffleRef = useRef(shuffle)

  const onEnd = () => {
    if (!repeatRef.current) {
      if (shuffleRef.current) {
        dispatch(PlayerbarActions.shuffleActiveSong())
      } else {
        dispatch(PlayerbarActions.setNextSong())
      }
    }
    setSeek(0)
    howlerRef.current?.seek(0)
  }

  const onLoad = () => {
    if (howlerRef.current) {
      setDuration(howlerRef.current.duration())
    }
  }

  const onSeek = (e: number[]) => {
    setSeek(e[0])
    howlerRef.current?.seek(e[0])
  }

  const handleNextSong = () => {
    onEnd()
  }

  const handlePrevSong = () => {
    if (shuffle) {
      dispatch(PlayerbarActions.shuffleActiveSong())
    } else {
      dispatch(PlayerbarActions.setPrevSong())
    }
    setSeek(0)
    howlerRef.current?.seek(0)
  }

  const handleIsPlaying = () => {
    dispatch(PlayerbarActions.setIsPlaying())
  }

  const handleChangeVolume = (value: number) => {
    setVolume(value)
    howlerRef.current?.howler.volume(value)
  }

  useEffect(() => {
    let intervalId!: any

    if (isPlaying && !isSeeking) {
      intervalId = setInterval(() => {
        if (howlerRef.current) {
          setSeek(howlerRef.current.seek())
        }
      }, 1_000)
    } else {
      clearInterval(intervalId)
    }

    return () => clearInterval(intervalId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    repeatRef.current = repeat
    shuffleRef.current = shuffle
  }, [repeat, shuffle])

  if (!song) return null

  return (
    <>
      <ReactHowler
        playing={isPlaying && !isSeeking}
        src={song.url}
        ref={howlerRef}
        onEnd={() => onEnd()}
        onLoad={onLoad}
        volume={volume}
      />
      <Grid
        bg="blackAlpha.900"
        padding="3"
        height="100%"
        templateColumns="1fr 2fr 1fr"
        gap={5}
      >
        <GridItem>
          <Center gap={3} justifyContent="flex-start">
            <Image
              src={song.photo}
              alt="playerbar image"
              boxSize="70px"
              borderRadius="sm"
            />
            <Box>
              <Text
                as="h6"
                fontWeight={450}
                fontSize="lg"
                color="white"
                whiteSpace="nowrap"
              >
                {song.name}
              </Text>
              <Text as="p" fontSize="sm" color="whiteAlpha.700">
                {playlist.find((s) => s.id === song.id)?.artist.name}
              </Text>
            </Box>
            <AiOutlineHeart size={20} />
          </Center>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Center color="gray.200">
              <ButtonGroup>
                <IconButton
                  aria-label="shuffle"
                  variant="link"
                  fontSize="xl"
                  icon={<MdShuffle />}
                  color={shuffle ? 'green.500' : 'inherit'}
                  onClick={() => setShuffle((prev) => !prev)}
                />
                <IconButton
                  aria-label="shuffle"
                  variant="link"
                  fontSize="4xl"
                  icon={<MdSkipPrevious />}
                  color="inherit"
                  _active={{ color: 'green.500' }}
                  onClick={handlePrevSong}
                />
                <IconButton
                  aria-label="shuffle"
                  icon={
                    isPlaying ? (
                      <BsFillPauseFill fontSize="30px" />
                    ) : (
                      <BsFillPlayFill fontSize="30px" />
                    )
                  }
                  colorScheme="green"
                  size="lg"
                  isRound
                  onClick={handleIsPlaying}
                />
                <IconButton
                  aria-label="shuffle"
                  variant="link"
                  fontSize="4xl"
                  icon={<MdSkipNext />}
                  color="inherit"
                  _active={{ color: 'green.500' }}
                  onClick={handleNextSong}
                />
                <IconButton
                  aria-label="shuffle"
                  variant="link"
                  fontSize="xl"
                  icon={<MdOutlineRepeat />}
                  color={repeat ? 'green.500' : 'inherit'}
                  onClick={() => setRepeat((prev) => !prev)}
                />
              </ButtonGroup>
            </Center>
            <SongController
              seek={seek}
              duration={duration}
              onSeek={onSeek}
              setIsSeeking={setIsSeeking}
            />
          </Flex>
        </GridItem>
        <GridItem>
          <VolumeController
            volume={volume}
            handleChangeVolume={handleChangeVolume}
          />
        </GridItem>
      </Grid>
    </>
  )
}

export default Playerbar
