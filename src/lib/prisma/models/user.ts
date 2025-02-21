import { registerData } from "@/lib/auth/types";
import prisma from "../prisma";
import { formatBigIntToString } from "@/lib/utils";
import { users } from "@prisma/client";
import { code, ServiceError } from "@/lib/exception";

export class User {

    static async formatUserForResponse<T>(user: users): Promise<T> {
        const userFormated = {
            ...user,
            id: formatBigIntToString(user.id)
        };

        return userFormated as T;
    }

    static async create(body: registerData) {
        let user = await prisma.users.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                id_rol: 1,
            },
        });

        const userFormated = await this.formatUserForResponse(user)

        return userFormated;
    }

    static async findById(id: number) {
        const user = await prisma.users.findUnique({
            where: { id },
        });

        if (user) {
            const userFormated = await this.formatUserForResponse(user)

            return userFormated;
        }

        return null;
    }

    static async findByEmail(email: string): Promise<users | null> {
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (user) {
            const userFormated = await this.formatUserForResponse(user)

            return userFormated as users;
        }

        return null;
    }

    static async all() {
        const user: users[] = await prisma.users.findMany();

        let listUser: any[] = [];
        for (let index = 0; index < user.length; index++) {
            const usersFormated = await this.formatUserForResponse(user[index])
            listUser = [...listUser, usersFormated];
        }

        return listUser as users[];
    }

    static async update(id: number, data: { name?: string; password?: string; rol?: number }) {
        return await prisma.users.update({
            where: { id },
            data,
        });
    }

    static async delete(id: number) {
        const user: users = await prisma.users.delete({
            where: { id },
        });

        if (!user) {
            throw new ServiceError("Ocurrió un error al eliminar el registro", code.UNPROCESSABLE);
        }

        return true;
    }
}