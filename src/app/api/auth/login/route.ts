import { login } from "@/lib/controllers/authController";
import { loginData } from "@/lib/types";
import { NextResponse } from "next/server";
import { OK } from "@/lib/utils";
import { ServiceErrorHandler } from "@/lib/exception";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body: loginData = await req.json();

    const token = await login(body, req);

    const cookieStore = await cookies();

    cookieStore.set("session_token", JSON.stringify(token));

    return NextResponse.json({
      message: "Sesión iniciada",
      code: OK,
      token: token,
    });
  } catch (error) {
    return ServiceErrorHandler(error);
  }
}
