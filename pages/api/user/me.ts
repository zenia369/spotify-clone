import routeApiGuard from '@/src/middlewares/route.api.guard'

export default routeApiGuard((req, res, user) => {
  res.json({ user })
})
