import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function redirectMiddleware(req: NextRequest) {
    if (req.nextUrl.pathname === "/") {
        return NextResponse.rewrite(new URL("/dashboard", req.url));
    }

    return;
}