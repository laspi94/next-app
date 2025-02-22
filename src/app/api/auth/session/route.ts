import { BAD_REQUEST, OK } from "@/lib/utils";
import { NextResponse } from "next/server";
import { ServiceError, ServiceErrorHandler } from "@/lib/exception";
import { session } from "@/lib/auth/controller";
import { User } from "@/lib/prisma/models";

export async function GET(req: Request) {

    try {
        const authHeader = req.headers.get('Authorization');

        if (!authHeader) {
            throw new ServiceError("No se recibió token de acceso", BAD_REQUEST);
        }

        const token = authHeader.split(" ")[1]

        const user = await session(token, req);

        const userResponse = await User.formatUserForResponse(user);

        return NextResponse.json({ message: "Sesión válida", code: OK, user: userResponse });
    } catch (error) {
        return ServiceErrorHandler(error);
    }
}