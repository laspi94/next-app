import { OK, UNAUTHORIZE } from "@/lib/helpers";
import { NextResponse } from "next/server";
import { ServiceError, ServiceErrorHandler } from "@/lib/exception";
import { cookies } from "next/headers";
import { MenuGenerator } from "@/lib/helpers/MenuGenerator";

export async function GET(req: Request) {
    try {
        const cookie = await cookies();

        if (!cookie) {
            throw new ServiceError("No se puedieron obtener las cookies", UNAUTHORIZE);
        }

        const user = cookie.get("session_user");
        const userParsed = user ? JSON.parse(user.value) : undefined;

        const menu = await MenuGenerator.generateMenu(userParsed)

        const forms = JSON.stringify(menu);

        return NextResponse.json({ message: "Menu obtenido", code: OK, forms, });
    } catch (error) {
        return ServiceErrorHandler(error);
    }
}
