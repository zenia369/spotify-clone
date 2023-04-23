import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/'],
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('JWT')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/singin', req.url))
  }
}
