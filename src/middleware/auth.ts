import { OK } from "@/lib/utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function authMiddleware(req: NextRequest) {

    const publicRoutes = [
        "/login",
        "/register"
    ];

    if (publicRoutes.includes(req.nextUrl.pathname)) {
        return;
    }

    const cookies = req.cookies.get("session_token");

    if (!cookies) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const token = JSON.parse(cookies.value);

    const response = await fetch(new URL("/api/auth/session", req.url), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (result.code !== OK) {
        return NextResponse.redirect(new URL("/login", req.url));
    }
}
