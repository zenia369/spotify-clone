import Link from 'next/link'

import { Box, Flex, Grid, GridItem, LinkBox, Text } from '@chakra-ui/layout'
import { MdArrowOutward } from 'react-icons/md'

import { Artist } from '@prisma/client'

import ArtistCard from './ArtistCard'

interface ArtistsProps {
  artists: Artist[]
}

const Artists = ({ artists }: ArtistsProps) => {
  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Box>
          <Text as="h3" color="white" fontWeight="semibold" fontSize="2xl">
            Top artists this month
          </Text>
          <Text as="p" color="whiteAlpha.600">
            Only visible to You
          </Text>
        </Box>
        <LinkBox
          sx={{
            color: 'whiteAlpha.600',
            display: 'flex',
            alignItems: 'center',
            gap: '1',
          }}
          _hover={{ color: 'white' }}
        >
          <Link href="/">Show more</Link>
          <MdArrowOutward />
        </LinkBox>
      </Flex>
      <Grid
        gap="4"
        mt="4"
        templateColumns="repeat(auto-fit, 200px)"
        gridAutoRows="290px"
        justifyContent="space-between"
        justifyItems="center"
      >
        {artists.map((a) => (
          <GridItem key={`artists-card-${a.id}`}>
            <ArtistCard {...a} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Artists
