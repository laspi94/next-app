import { User } from "@/lib/prisma/models";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export type bodyRegister = {
    name: string,
    email: string,
    password: string,
}

const userRegisterSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function POST(req: Request) {

    try {
        let body: bodyRegister = await req.json();
        const parsedBody = userRegisterSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({ errors: parsedBody.error.format() }, { status: 400 });
        }

        const existingUser = await User.findByEmail(body.email);
        if (existingUser) {
            return NextResponse.json({ message: "El correo ya está registrado" }, { status: 400 });
        }

        const hashedPassword = await hash(body.password, 10);

        body = {
            ...body,
            password: hashedPassword
        };

        const newUser = await User.create(body);

        return NextResponse.json({ message: "Usuario registrado", user: newUser });
    } catch (error) {

        return NextResponse.json({ message: error }, { status: 500 });
    }
}
