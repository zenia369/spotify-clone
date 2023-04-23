import { prismaClient } from '@/src/lib/prisma'
import routeApiGuard from '@/src/middlewares/route.api.guard'

export default routeApiGuard(async (req, res, user) => {
  const playlistCount = await prismaClient.playList.count({
    where: {
      userId: user.id,
    },
  })

  res.json({ ...user, playlistCount })
})
