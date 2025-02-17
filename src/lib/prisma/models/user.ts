import prisma from "../prisma";

export class User {

    static async session() {
        return await prisma.User.findUnique({
            by: ["status"],
            _sum: { amount: true },
            where: {
                createdAt: { gte: new Date("2024-01-01") }, // Solo registros de 2024 en adelante
            },
        });
    }

    static async create() {
        return await prisma.User.create({
            data: {},
        });
    }

    static async findById(id: number) {
        return await prisma.User.findUnique({
            where: { id },
        });
    }

    static async all() {
        return await prisma.User.findMany();
    }

    static async update(id: number, data: { title?: string; content?: string }) {
        return await prisma.post.update({
            where: { id },
            data,
        });
    }

    static async delete(id: number) {
        return await prisma.post.delete({
            where: { id },
        });
    }
}