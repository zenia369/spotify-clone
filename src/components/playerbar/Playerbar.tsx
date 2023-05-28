import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Box,
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
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
import { getMinuts } from '@/src/utils/timeValidate'

const Playerbar = () => {
  const dispatch = useDispatch()
  const song = useSelector(PlayerbarSelect.song)
  const playlist = useSelector(PlayerbarSelect.playlist)
  const isPlaying = useSelector(PlayerbarSelect.isPlaying)
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [duration, setDuration] = useState(0.0)
  const [seek, setSeek] = useState(0.0)
  const howlerRef = useRef<ReactHowler | null>(null)
  const repeatRef = useRef(repeat)

  const onEnd = useCallback(() => {
    if (!repeatRef.current) {
      dispatch(PlayerbarActions.setNextSong())
    }
    setSeek(0)
    howlerRef.current?.seek(0)
  }, [dispatch])

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
    dispatch(PlayerbarActions.setPrevSong())
    setSeek(0)
    howlerRef.current?.seek(0)
  }

  const handleIsPlaying = () => {
    dispatch(PlayerbarActions.setIsPlaying())
  }

  useEffect(() => {
    let rafId!: number

    if (isPlaying && !isSeeking) {
      const updateRange = () => {
        if (howlerRef.current) {
          setSeek(howlerRef.current.seek())
          rafId = requestAnimationFrame(updateRange)
        }
      }

      rafId = requestAnimationFrame(updateRange)
      return () => cancelAnimationFrame(rafId)
    }

    cancelAnimationFrame(rafId)
  }, [isPlaying, isSeeking])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  if (!song) return null

  return (
    <>
      <ReactHowler
        playing={isPlaying && !isSeeking}
        src={song.url}
        ref={howlerRef}
        onEnd={() => onEnd()}
        onLoad={onLoad}
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
          <Flex flex="2" direction="column">
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
            <Center color="gray.200" gap={3}>
              <Text fontSize="xs">{getMinuts(Math.floor(seek))}</Text>
              <RangeSlider
                // eslint-disable-next-line jsx-a11y/aria-proptypes
                aria-label={['min', 'max']}
                step={0.1}
                min={0}
                max={duration ? Number(duration.toFixed(2)) : 0}
                id="player-range"
                onChange={onSeek}
                value={[seek]}
                onChangeStart={() => setIsSeeking(true)}
                onChangeEnd={() => setIsSeeking(false)}
              >
                <RangeSliderTrack color="gray.800">
                  <RangeSliderFilledTrack bg="gray.600" />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
              <Text fontSize="xs">{getMinuts(Math.floor(duration))}</Text>
            </Center>
          </Flex>
        </GridItem>
        <GridItem>
          <Box flex="1">test 2</Box>
        </GridItem>
      </Grid>
    </>
  )
}

export default Playerbar
