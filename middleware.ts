import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /dashboard, /profile)
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ["/", "/login", "/register", "/otp"];
  const isPublicPath = publicPaths.includes(path);

  // If accessing a protected route, check for access token
  if (!isPublicPath) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
