import { NextApiResponse } from 'next'
import cookie from 'cookie'

export const getBaseCookieOptions: cookie.CookieSerializeOptions | undefined = {
  secure: true,
  httpOnly: true,
  maxAge: 8 * 60 * 60,
  path: '/',
  sameSite: 'lax',
}

export const setHeaderCookie = (res: NextApiResponse, token: string) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('JWT', token, getBaseCookieOptions)
  )
}
