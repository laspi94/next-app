import prisma from "../prisma";

type newRol = {
    name: string,
}

export class Role {

    static async create({ name }: newRol) {
        return await prisma.roles.create({
            data: {
                name: name,
            },
        });
    }

    static async findById(id: number) {
        return await prisma.roles.findUnique({
            where: { id },
        });
    }

    static async all() {
        return await prisma.roles.findMany();
    }

    static async update(id: number, data: { name?: string; password?: string; rol?: number }) {
        return await prisma.roles.update({
            where: { id },
            data,
        });
    }

    static async delete(id: number) {
        return await prisma.roles.delete({
            where: { id },
        });
    }
}