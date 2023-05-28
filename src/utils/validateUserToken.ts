import jwt from 'jsonwebtoken'

import { prismaClient } from '../lib/prisma'

import { IJWT } from './jwt_token'

export const verifyUserToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SERCER_KEY as string) as IJWT

export default async (token: string) => {
  const { uid } = verifyUserToken(token)

  const user = await prismaClient.user.findUnique({
    where: { id: uid },
  })

  if (!user) throw Error('user unreal')

  return user
}
