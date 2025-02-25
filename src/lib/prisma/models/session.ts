import { randomBytes } from "crypto";
import { users } from "@prisma/client";
import prisma from "@/lib/prisma/prisma";

export class Session {
  /** Recupera la sessión */
  static async exist(token: string | undefined) {
    return await prisma.sessions.findFirst({
      where: {
        token: token,
      },
    });
  }

  /** Crea la sesión del usuario */
  static async create(user: users, req: Request) {
    const idAddress = req.headers.get("x-forwarded-for") ?? "0.0.0.0";
    const userAgent = req.headers.get("user-agent") ?? "unknown";

    const session = await prisma.sessions.create({
      data: {
        id_user: user.id,
        token: Session.generateToken(),
        refresh_token: Session.generateToken(),
        ip_address: idAddress,
        user_agent: userAgent,
        last_activity: Math.floor(Date.now() / 1000),
      },
    });

    return session;
  }

  /** Crea la sesión del usuario */
  static async updateLastActivity(id: bigint) {
    const data = {
      last_activity: Math.floor(Date.now() / 1000),
    };

    const session = await prisma.sessions.update({
      where: { id },
      data,
    });

    return session;
  }

  /** genera un token para la sesión del usuario */
  static generateToken(): string {
    return randomBytes(20).toString("hex");
  }
}
