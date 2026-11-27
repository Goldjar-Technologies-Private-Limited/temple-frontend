import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require user authentication
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/addresses",
  "/delete-account",
  "/prasadam",
  "/seva-donation",
  "/order-details",
  "/payment",
  "/my-orders",
  "/my-bookings",
  "/my-donations",
  "/events",
  "/live-darshan",
  "/notifications",
  "/help",
  "/darshan-timings",
  "/temple-information",
  "/reels",
];

// Routes reserved for non-authenticated users
const AUTH_ONLY_ROUTES = ["/login", "/register", "/otp"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("c_token")?.value;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  const isAuthOnly = AUTH_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // If trying to access protected route without token, redirect to /login
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in and trying to access /login, /register, or /otp, redirect to /dashboard
  if (isAuthOnly && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (e.g. .svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
