import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { prismaClient } from '@/src/lib/prisma'

import validateUserToken from '@/src/utils/validateUserToken'
import normalizeSSRData from '@/src/utils/normalizeSSRData'

import Playlits from '@/src/pages/Playlits'

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext) {
  try {
    const user = await validateUserToken(req.cookies.JWT as string)
    const data = await prismaClient.playList.findFirstOrThrow({
      where: {
        id: Number(query.id),
        userId: user.id,
      },
      include: {
        songs: {
          include: {
            artist: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    })

    return {
      props: {
        playlist: normalizeSSRData(data),
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/singin',
        permanent: false,
      },
    }
  }
}

export default ({
  playlist,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Playlits playlist={playlist} />
}
