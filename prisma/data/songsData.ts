export const artistsData: {
  name: string
  photo: string
  songs: /* { name: string; duration: number; url: string; artist?: string } */ any[]
}[] = [
  {
    name: 'Glitch',
    photo: 'https://i.scdn.co/image/ab676161000051747606e1e866141b00009d681e',
    songs: [
      {
        name: 'Fermi Paradox',
        duration: 235,
        url: 'https://dl.dropboxusercontent.com/s/7xmpwvvek6szx5n/fermi-paradox.mp3?dl=0',
      },
    ],
  },
  {
    name: 'Purple Cat',
    photo: 'https://i.scdn.co/image/ab67616100005174d8b9980db67272cb4d2c3daf',
    songs: [
      {
        name: 'Long Day',
        duration: 185,
        url: 'https://dl.dropboxusercontent.com/s/9h90r7ku3df5o9y/long-day.mp3?dl=0',
      },
    ],
  },
  {
    name: 'Ben Sound',
    photo: 'https://i.scdn.co/image/ab676161000051746710f398120d963205aa0e85',
    songs: [
      {
        name: 'The Elevator Bossa Nova',
        duration: 238,
        url: 'https://dl.dropboxusercontent.com/s/7dh5o3kfjcz0nh3/The-Elevator-Bossa-Nova.mp3?dl=0',
      },
    ],
  },
  {
    name: 'LiQWYD',
    photo: 'https://i.scdn.co/image/ab6761610000517464cc764c9c06e0cbe169c62d',
    songs: [
      {
        name: 'Winter',
        duration: 162,
        url: 'https://dl.dropboxusercontent.com/s/tlx2zev0as500ki/winter.mp3?dl=0',
      },
    ],
  },
  {
    name: 'FSM Team',
    photo: 'https://i.scdn.co/image/ab676161000051742a80171a932a1b5bc73794cd',
    songs: [
      {
        name: 'Eternal Springtime',
        duration: 302,
        url: 'https://dl.dropboxusercontent.com/s/92u8d427bz0b1t8/eternal-springtime.mp3?dl=0',
      },
      {
        name: 'Astronaut in a Submarine',
        duration: 239,
        artist: 'FSM Team',
        url: 'https://dl.dropboxusercontent.com/s/9b43fr6epbgji4f/astronaut-in-a-submarine.mp3?dl=0',
      },
    ],
  },
]
