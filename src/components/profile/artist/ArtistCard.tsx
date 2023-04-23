import { Box, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { Artist } from '@prisma/client'

interface ArtistCardProps extends Artist { }

const ArtistCard = ({ name, photo }: ArtistCardProps) => {
  return (
    <Box
      height="100%"
      width="100%"
      bgGradient="linear(180deg, rgba(255,255,255,0) 0%, rgba(26,26,26,1) 100%)"
      boxShadow="2xl"
      padding="20px"
      borderRadius={7}
    >
      <Image
        src={photo}
        alt={`Artist photo ${name}`}
        borderRadius="100%"
        boxShadow="lg"
        boxSize="160px"
      />
      <Box color="white" mt={4}>
        <Text as="h6" fontWeight="semibold" fontSize="2xl">
          {name}
        </Text>
        <Text as="p" color="whiteAlpha.600" fontSize="md">
          Artist
        </Text>
      </Box>
    </Box>
  )
}

export default ArtistCard
