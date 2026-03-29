import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const role = request.cookies.get('user_role')?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isNgoRoute = request.nextUrl.pathname.startsWith('/ngo');

  if (isAdminRoute && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isNgoRoute && role !== 'ngo') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/ngo/:path*'],
};
