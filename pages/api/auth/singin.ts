import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { prismaClient } from '@/src/lib/prisma'
import { createTokenJWT } from '@/src/utils/jwt_token'
import { setHeaderCookie } from '@/src/utils/setHeaders'

type userData = {
  email: string
  password: string
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body as userData

  const user = await prismaClient.user.findUnique({
    where: { email },
  })

  const isAuth = user && bcrypt.compareSync(password, user.password)

  if (isAuth) {
    const token = await createTokenJWT(user)

    setHeaderCookie(res, token)

    res.json({
      user,
    })
  } else throw new Error()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req

    switch (method) {
      case 'POST':
        await postHandler(req, res)
        break
      default:
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'server error: singin',
    })
  }
}
