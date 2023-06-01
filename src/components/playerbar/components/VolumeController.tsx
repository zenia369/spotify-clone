import { useState } from 'react'
import {
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Flex,
} from '@chakra-ui/react'

import { BiVolumeFull, BiVolumeMute } from 'react-icons/bi'

interface VolumeControllerProps {
  // eslint-disable-next-line no-unused-vars
  handleChangeVolume: (param: number) => void
  volume: number
}

const VolumeController = ({
  handleChangeVolume,
  volume,
}: VolumeControllerProps) => {
  const [volumeMute, setVolumeMute] = useState(false)

  const onSeek = (e: number[]) => {
    handleChangeVolume(e[0])
  }

  const handleVolumeMute = () => {
    setVolumeMute((prev) => {
      const newValue = !prev
      if (newValue) {
        handleChangeVolume(0)
      } else {
        handleChangeVolume(volume)
      }
      return newValue
    })
  }

  return (
    <Flex gap={1} alignItems="center" justifyContent="center" height="100%">
      <IconButton
        aria-label="sound"
        variant="link"
        color="white"
        fontSize="xl"
        icon={volumeMute ? <BiVolumeMute /> : <BiVolumeFull />}
        _active={{ color: 'green.500' }}
        onClick={handleVolumeMute}
      />
      <RangeSlider
        // eslint-disable-next-line jsx-a11y/aria-proptypes
        aria-label={['min', 'max']}
        step={0.01}
        min={0}
        max={1}
        value={[volume]}
        id="player-range-volume"
        width="100px"
        onChange={onSeek}
      >
        <RangeSliderTrack color="gray.800">
          <RangeSliderFilledTrack bg="gray.600" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
      </RangeSlider>
    </Flex>
  )
}

export default VolumeController
