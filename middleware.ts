import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-dev";

export async function middleware(request: NextRequest) {
  // Only apply to /backeand routes, but not /backeand/login
  if (request.nextUrl.pathname.startsWith('/backeand') && !request.nextUrl.pathname.startsWith('/backeand/login')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/backeand/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      // Valid token, allow access
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/backeand/login', request.url));
    }
  }

  // Also protect admin APIs, except login
  if (request.nextUrl.pathname.startsWith('/api/admin') && !request.nextUrl.pathname.startsWith('/api/admin/login')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/backeand/:path*',
    '/api/admin/:path*'
  ],
};
