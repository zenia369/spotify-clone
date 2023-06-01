import { memo } from 'react'
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Text,
} from '@chakra-ui/react'

import { getMinuts } from '@/src/utils/timeValidate'

interface SongControllerProps {
  seek: number
  duration: number
  // eslint-disable-next-line no-unused-vars
  setIsSeeking: (param: boolean) => void
  // eslint-disable-next-line no-unused-vars
  onSeek: (param: number[]) => void
}

const SongController = ({
  duration,
  seek,
  onSeek,
  setIsSeeking,
}: SongControllerProps) => {
  return (
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
  )
}

export default memo(SongController)
