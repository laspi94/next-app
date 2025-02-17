import { NextResponse } from "next/server";

type params = {
}

export async function POST(req: Request, { }: params) {
    const { email, password } = await req.json();
    // const newUser = await createUser(email, password);

    // return NextResponse.json({ message: "Usuario registrado", user: newUser });
}
