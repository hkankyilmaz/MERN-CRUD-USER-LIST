import { NextResponse } from "next/server";

export function middleware(req) {
  // get cookie token
  const hasToken = req.cookies.get("__Secure-next-auth.session-token");

  // login & register routes
  if (["/signin", "/signup"].includes(req.nextUrl.pathname)) {
    if (hasToken) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  if ("/" == req.nextUrl.pathname) {
    if (!hasToken) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }
}
