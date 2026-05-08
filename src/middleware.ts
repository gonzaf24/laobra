import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Si el navegador intenta entrar en /es (por cache de seetymap), 
  // lo redirigimos silenciosamente a la raíz.
  if (request.nextUrl.pathname.startsWith('/es')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/es/:path*',
}
