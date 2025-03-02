import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { OK } from "@/lib/helpers";
import { ServiceErrorHandler } from "@/lib/exception";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();

        cookieStore.delete("session_token");

        return NextResponse.json({ message: "Sesión terminada", code: OK });
    } catch (error) {
        return ServiceErrorHandler(error);
    }
}
