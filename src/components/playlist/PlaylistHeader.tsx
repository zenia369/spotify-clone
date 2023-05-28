import { Box, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

interface PlaylistHeaderProps {
  gradient: any
  imageSrc: string
  title: string
  subtitle: string
  description: string
}

const PlaylistHeader = ({
  gradient,
  imageSrc,
  title,
  subtitle,
  description,
}: PlaylistHeaderProps) => {
  return (
    <Box
      as="header"
      display="flex"
      alignItems="end"
      bg={`${gradient}.600`}
      padding="40px"
      gap={6}
    >
      <Image
        src={imageSrc}
        alt="header image"
        boxSize="190px"
        boxShadow="2xl"
        borderRadius="2xl"
      />
      <Box lineHeight="40px" flex={1} color="white">
        <Text as="p" fontSize="x-small" fontWeight="500" casing="uppercase">
          {subtitle}
        </Text>
        <Text as="h1" fontSize="7xl" marginTop="5px" fontWeight="bold">
          {title}
        </Text>
        <Text as="p" fontSize="l-small" marginTop="10px" fontWeight="400">
          {description}
        </Text>
      </Box>
    </Box>
  )
}

export default PlaylistHeader
