import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { prismaClient } from '@/src/lib/prisma'
import { setHeaderCookie } from '@/src/utils/setHeaders'
import { createTokenJWT } from '@/src/utils/jwt_token'

type userData = {
  email: string
  password: string
  name: string
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body as userData

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: bcrypt.hashSync(password, 7),
    },
  })

  const token = await createTokenJWT(user)

  setHeaderCookie(res, token)

  res.json({
    user,
  })
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
  } catch (error) {
    res.status(500).end('server error: singup')
  }
}
