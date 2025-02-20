import { registerUser } from "@/lib/auth/controller";
import { registerData } from "@/lib/auth/types";
import { ServiceErrorHandler } from "@/lib/exception";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        let body: registerData = await req.json();

        const newUser = await registerUser(body);

        return NextResponse.json({ message: "Usuario registrado", user: newUser });
    } catch (error) {
        return ServiceErrorHandler(error);
    }
}
