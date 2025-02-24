import { OK } from "@/lib/utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function redirectIfAuthenticateMiddleware(req: NextRequest) {

    const publicRoutes = [
        "/login",
        "/register"
    ];

    if (publicRoutes.includes(req.nextUrl.pathname)) {
        const cookies = req.cookies.get("session_token");

        if (!cookies) {
            return;
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

        if (result.code === OK) {
            return NextResponse.redirect(new URL("/home", req.url));
        }
    }
}
