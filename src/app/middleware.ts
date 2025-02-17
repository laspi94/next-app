import { NextResponse } from "next/server";

export function middleware(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/"],
};
