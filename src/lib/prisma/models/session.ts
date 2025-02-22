import { randomBytes } from "crypto";
import { users } from "@prisma/client";
import prisma from "../prisma";

export class Session {

    /** Recupera la sessión */
    static async exist(token: string, idAddress: string, userAgent: string) {
        return await prisma.sessions.findFirst({
            where: {
                user_agent: userAgent,
                ip_address: idAddress,
                token: token,
            },
        });
    }

    /** Crea la sesión del usuario */
    static async create(user: users, req: Request) {

        const idAddress = req.headers.get('x-forwarded-for');
        const userAgent = req.headers.get('user-agent') ?? 'unknown';

        const session = await prisma.sessions.create({
            data: {
                id_user: user.id,
                token: Session.generateToken(),
                refresh_token: Session.generateToken(),
                ip_address: idAddress,
                user_agent: userAgent,
                last_activity: Math.floor(Date.now() / 1000)
            }

        });

        return session;
    }

    /** genera un token para la sesión del usuario */
    static generateToken(): string {
        return randomBytes(20).toString("hex");
    }
}