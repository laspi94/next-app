import { login } from "@/lib/auth/controller";
import { loginData } from "@/lib/auth/types";
import { NextResponse } from "next/server";
import { OK } from "@/lib/utils";
import { ServiceErrorHandler } from "@/lib/exception";

export async function POST(req: Request) {

    try {
        const body: loginData = await req.json();

        const token = await login(body, req);

        return NextResponse.json({ message: "Sesión iniciada", code: OK, token: token });
    } catch (error) {
        return ServiceErrorHandler(error);
    }
}
