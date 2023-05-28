import { Artist, PlayList, Song } from '@prisma/client'

export type PlayListItemWithArtist = Song & {
  artist: Pick<Artist, 'name' | 'id'>
}

export type PlayListWithSongs = PlayList & {
  songs: PlayListItemWithArtist[]
}

export interface PlaylitsProps {
  playlist: PlayListWithSongs
}
