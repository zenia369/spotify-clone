import { prismaClient } from '@/src/lib/prisma'
import routeApiGuard from '@/src/middlewares/route.api.guard'

export default routeApiGuard(async (req, res) => {
  const playlist = await prismaClient.playList.findUnique({
    where: {
      id: Number(req.query.id),
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

  res.json(playlist)
})
