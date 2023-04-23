import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

import { artistsData } from './data/songsData'

const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(
    artistsData.map(async (a) => {
      return prisma.artist.upsert({
        create: {
          name: a.name,
          photo: a.photo,
          songs: {
            create: a.songs.map((s) => ({
              name: s.name,
              duration: s.duration,
              url: s.url,
              photo: (() => {
                switch (Math.floor(Math.random() * 4)) {
                  case 1:
                    return 'https://i.scdn.co/image/ab67706f00000002f11d2a4483ba53adf4ee6c55'
                  case 2:
                    return 'https://i.scdn.co/image/ab67706f00000002678b81229c4b783dd816d87a'
                  case 3:
                    return 'https://i.scdn.co/image/ab67706f00000002b442525b24a5446eab46e425'
                  case 4:
                    return 'https://i.scdn.co/image/ab67706f000000023f393a2591bc5b8b30e7b25d'
                  default:
                    return 'https://i.scdn.co/image/ab67706f000000023f393a2591bc5b8b30e7b25d'
                }
              })(),
            })),
          },
        },
        update: {},
        where: { name: a.name },
      })
    })
  )

  const user = await prisma.user.upsert({
    where: { email: process.env.BD_USER_EMAIL as string },
    update: {},
    create: {
      email: process.env.BD_USER_EMAIL as string,
      password: bcrypt.hashSync(
        process.env.BD_USER_PASSWORD as string,
        7
      ) as string,
      name: 'Admin',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fimage%2FKeqing.png?alt=media&token',
    },
  })

  const songs = await prisma.song.findMany()
  await Promise.all(
    new Array(10).fill(0).map(async (_, idx) =>
      prisma.playList.create({
        data: {
          name: `Play list #${idx + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((s) => ({ id: s.id })),
          },
          photo: (() => {
            switch (Math.floor(Math.random() * 4)) {
              case 1:
                return 'https://i.scdn.co/image/ab67706f0000000294bddc1d05920cce685229c5'
              case 2:
                return 'https://i.scdn.co/image/ab67616d00001e02805f18ea6fae699849c104de'
              case 3:
                return 'https://seed-mix-image.spotifycdn.com/v6/img/chill/2VVDDOoBIhsMVPJMoUXjUE/en/default'
              case 4:
                return 'https://i.scdn.co/image/ab67706f000000028a24ebc68da6edc3eb998fcf'
              default:
                return 'https://i.scdn.co/image/ab67616d00001e02e7e9b85cc1f021ec12130d80'
            }
          })(),
        },
      })
    )
  )
}

run()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
