import { NextApiRequest } from "next";
import { randomBytes } from "crypto";
import { users } from "@prisma/client";
import prisma from "../prisma";

export class Session {
    /** Recupera la sessión desde un usuario */
    static async getFromUser(user: users, token: string) {
        return await prisma.sessions.findFirst({
            where: {
                id_user: user.id,
                token: token,
            },
        });
    }

    /** Crea la sesión del usuario */
    static async create(user: users, req: NextApiRequest) {
        const ipAddress = req.headers["x-forwarded-for"]?.toString().split(",")[0] || req.socket?.remoteAddress || "Unknown";
        const userAgent = req.headers["user-agent"] || "Unknown";

        return await prisma.sessions.create({
            data: {
                id_user: user.id,
                token: Session.generateToken(),
                refresh_token: Session.generateToken(),
                ip_address: ipAddress,
                user_agent: userAgent,
                last_activity: Math.floor(Date.now() / 1000)
            }

        });
    }

    /** genera un token para la sesión del usuario */
    static generateToken(): string {
        return randomBytes(50).toString("hex");
    }
}