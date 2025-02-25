import { BAD_REQUEST, OK } from "@/lib/utils";
import { NextResponse } from "next/server";
import { ServiceError, ServiceErrorHandler } from "@/lib/exception";
import { session } from "@/lib/controllers/authController";
import { User } from "@/lib/prisma/models";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      throw new ServiceError("No se recibió token de acceso", BAD_REQUEST);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new ServiceError("El formato del token es incorrecto", BAD_REQUEST);
    }

    const token = authHeader.split(" ")[1];

    if (!token || token.trim() === "") {
      throw new ServiceError("Token de acceso vacío o inválido", BAD_REQUEST);
    }

    const user = await session(token, req);

    const userResponse = await User.formatUserForResponse(user);

    return NextResponse.json({ message: "Sesión válida", code: OK, user: userResponse, });
  } catch (error) {
    return ServiceErrorHandler(error);
  }
}
