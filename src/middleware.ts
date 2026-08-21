import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if visiting any /admin path except /admin/login
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const adminToken = request.cookies.get("admin-token")?.value;

        // If no token cookie or invalid, redirect to login page
        if (!adminToken || adminToken !== "toypark-secret123") {
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
