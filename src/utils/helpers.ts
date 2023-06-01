import { PlayListItemWithArtist } from '../types/Playlist'

export function getRandValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandomSong(
  playlist: PlayListItemWithArtist[],
  playedSongs: number[]
): PlayListItemWithArtist | typeof getRandomSong {
  const randIdx = getRandValue(0, playlist.length)
  const song = playlist.at(randIdx) as PlayListItemWithArtist

  if (
    playedSongs.length !== playlist.length &&
    playedSongs.find((s) => s === song.id)
  ) {
    return getRandomSong(playlist, playedSongs)
  }

  return song
}
