import jwt from 'jsonwebtoken'

import { prismaClient } from '../lib/prisma'

import { IJWT } from './jwt_token'

export default async (token: string) => {
  const { uid } = jwt.verify(
    token,
    process.env.JWT_SERCER_KEY as string
  ) as IJWT

  const user = await prismaClient.user.findUnique({
    where: { id: uid },
  })

  if (!user) throw Error('user unreal')

  return user
}
