import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

interface profileHeaderProps {
  gradient: any
  imageSrc: string
  title: string
  subtitle: string
  description: string
}

const ProfileHeader = ({
  gradient,
  imageSrc,
  title,
  subtitle,
  description,
}: profileHeaderProps) => {
  return (
    <Flex as="header" bg={`${gradient}.600`} align="end" padding="40px" gap={6}>
      <Image
        src={imageSrc}
        alt="header image"
        boxSize="190px"
        boxShadow="2xl"
        borderRadius="100%"
      />
      <Box lineHeight="40px" flex={1} color="whiteAlpha.800">
        <Text as="p" fontSize="x-small" fontWeight="bold" casing="uppercase">
          {subtitle}
        </Text>
        <Text as="h1" fontSize="7xl" marginTop="5px">
          {title}
        </Text>
        <Text as="p" fontSize="l-small" marginTop="10px">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}

export default ProfileHeader
