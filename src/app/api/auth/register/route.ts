import { NextResponse } from "next/server";
import { registerData } from "@/lib/types";
import { registerUser } from "@/lib/controllers/authController";
import { ServiceErrorHandler } from "@/lib/exception";

export async function POST(req: Request) {
  try {
    const body: registerData = await req.json();

    const newUser = await registerUser(body);

    return NextResponse.json({ message: "Usuario registrado", user: newUser });
  } catch (error) {
    return ServiceErrorHandler(error);
  }
}
