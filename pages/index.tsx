import { Artist } from '@prisma/client'

import { prismaClient } from '@/src/lib/prisma'

import Profile from '@/src/pages/Profile'

const Home = ({ artists }: { artists: Artist[] }) => {
  return <Profile artists={artists} />
}

export async function getServerSideProps() {
  const artists = await prismaClient.artist.findMany({})

  return {
    props: {
      artists: JSON.parse(JSON.stringify(artists)),
    },
  }
}

export default Home
