import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'

import validateUserToken from '../utils/validateUserToken'

// eslint-disable-next-line no-unused-vars
export default (
  // eslint-disable-next-line no-unused-vars
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies.JWT

      if (!token) throw Error('missed token')

      const user = await validateUserToken(token)

      if (!user) throw Error('user unreal')

      return handler(req, res, user)
    } catch (error) {
      res.redirect('/singin')
    }
  }
}
