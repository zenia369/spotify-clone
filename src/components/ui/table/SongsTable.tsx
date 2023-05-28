import { memo } from 'react'
import { Image, Box, Text, Grid, GridItem } from '@chakra-ui/react'
import { AiOutlineClockCircle } from 'react-icons/ai'

import { Song, Artist } from '@prisma/client'
import { getMinuts } from '@/src/utils/timeValidate'

interface SongsTableProps {
  songs: (Song & {
    artist: Pick<Artist, 'name' | 'id'>
  })[]
  // eslint-disable-next-line no-unused-vars
  onClick: (...params: any[]) => void
}

const SONGS_TABLE_ITEM_ROW =
  '50px minmax(300px, 2fr) minmax(200px, 1fr) minmax(50px, 0.3fr)'

const SongsTable = ({ songs, onClick }: SongsTableProps) => {
  return (
    <Box
      color="white"
      padding="0 10px"
      overflowX="auto"
      overflowY="hidden"
      maxWidth="100%"
      whiteSpace="nowrap"
    >
      <Grid
        templateColumns={SONGS_TABLE_ITEM_ROW}
        borderBottom="1px solid rgba(255, 255, 255, 0.2)"
        fontWeight="medium"
        textTransform="uppercase"
        marginBottom="20px"
        minWidth="100%"
        padding="5px 0"
      >
        <GridItem textAlign="center">#</GridItem>
        <GridItem>Title</GridItem>
        <GridItem>Date added</GridItem>
        <GridItem display="flex" justifyContent="center">
          <AiOutlineClockCircle />
        </GridItem>
      </Grid>
      {songs.map((s, idx) => (
        <Grid
          key={s.id + s.name.trim()}
          templateColumns={SONGS_TABLE_ITEM_ROW}
          transition="all 0.3s"
          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
          cursor="pointer"
          padding="5px 0"
          alignItems="center"
          onClick={() => onClick(s.id)}
        >
          <GridItem display="flex" alignItems="center" justifyContent="center">
            {idx + 1}
          </GridItem>
          <GridItem>
            <Box display="flex" gap="6" alignItems="center">
              <Image src={s.photo} h="50px" w="50px" />
              <Box flex="1">
                <Text as="h6" mb="5px" fontSize="large">
                  {s.name}
                </Text>
                <Text as="p" fontSize="medium">
                  {s.artist.name}
                </Text>
              </Box>
            </Box>
          </GridItem>
          <GridItem>{s.created_at.toString()}</GridItem>
          <GridItem textAlign="center">{getMinuts(s.duration)}</GridItem>
        </Grid>
      ))}
    </Box>
  )
}

export default memo(SongsTable)
