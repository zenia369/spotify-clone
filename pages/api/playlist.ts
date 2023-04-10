import { prismaClient } from '@/src/lib/prisma'
import routeApiGuard from '@/src/middlewares/route.api.guard'

export default routeApiGuard(async (req, res, user) => {
  const playlist = await prismaClient.playList.findMany({
    where: { userId: user.id },
    orderBy: {
      name: 'asc',
    },
  })

  res.json(playlist)
})
