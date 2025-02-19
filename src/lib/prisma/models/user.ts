import { bodyRegister } from "@/app/api/register/route";
import prisma from "../prisma";

export class User {

    static async create(body: bodyRegister) {
        return await prisma.users.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
                id_rol: 1,
            },
        });
    }

    static async findById(id: number) {
        return await prisma.users.findUnique({
            where: { id },
        });
    }

    static async findByEmail(email: string) {
        return await prisma.users.findUnique({
            where: { email },
        });
    }

    static async all() {
        return await prisma.users.findMany();
    }

    static async update(id: number, data: { name?: string; password?: string; rol?: number }) {
        return await prisma.users.update({
            where: { id },
            data,
        });
    }

    static async delete(id: number) {
        return await prisma.users.delete({
            where: { id },
        });
    }
}