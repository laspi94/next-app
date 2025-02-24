import { registerData } from "@/lib/types";
import prisma from "../prisma";
import { formatBigIntToString, UNPROCESSABLE } from "@/lib/utils";
import { users } from "@prisma/client";
import { ServiceError } from "@/lib/exception";
export class User {

    static async formatUser<T>(user: users): Promise<T> {

        const userFormated = {
            ...user,
            id: formatBigIntToString(user.id)
        };

        return userFormated as T;
    }

    static async formatUserForResponse<T>(user: users): Promise<T> {

        const { password, created_at, updated_at, email_verified_at, banned, force_password_change, ...userCleaned } = user;

        const userFormated = {
            ...userCleaned,
            id: formatBigIntToString(user.id)
        };

        return userFormated as T;
    }

    static async create(body: registerData) {
        const user = await prisma.users.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password,
                id_rol: 1,
            },
        });

        const userFormated = await this.formatUser(user)

        return userFormated;
    }

    static async findById(id: number): Promise<users> {
        const user = await prisma.users.findUnique({
            where: { id },
        });

        const userFormated = await this.formatUser(user!);

        return userFormated as users;
    }

    static async findByEmail(email: string): Promise<users | null> {
        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (user) {
            const userFormated = await this.formatUser(user)

            return userFormated as users;
        }

        return null;
    }

    static async all(): Promise<users[]> {
        const user: users[] = await prisma.users.findMany();

        let listUser: users[] = [];
        for (let index = 0; index < user.length; index++) {
            const usersFormated = await this.formatUser(user[index])
            listUser = [...listUser, usersFormated as users];
        }

        return listUser;
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
            throw new ServiceError("Ocurrió un error al eliminar el registro", UNPROCESSABLE);
        }

        return true;
    }
}