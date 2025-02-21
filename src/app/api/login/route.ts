import { login } from "@/lib/auth/controller";
import { loginData } from "@/lib/auth/types";
import { ServiceErrorHandler } from "@/lib/exception";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        let body: loginData = await req.json();

        const token = await login(body, req);

        return NextResponse.json({ message: "Sesión iniciada", token: token });
    } catch (error) {
        return ServiceErrorHandler(error);
    }
}
