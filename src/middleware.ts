import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Get the token from cookies

  // If the URL is "/" and the token is "raven", redirect to /app
  if (request.nextUrl.pathname === "/" && token === "raven") {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  // If the token is invalid, redirect to home
  if (request.nextUrl.pathname === "/app" && token !== "raven") {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Apply middleware to both root and /app paths
export const config = {
  matcher: ["/", "/app/:path*"],
};
