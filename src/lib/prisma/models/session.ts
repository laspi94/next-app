import prisma from "../prisma";

export class Session {
    // Método estático para agrupar ventas por estado
    static async getSession() {
        return await prisma.User.findUnique({
            by: ["status"],
            _sum: { amount: true },
            where: {
                createdAt: { gte: new Date("2024-01-01") }, // Solo registros de 2024 en adelante
            },
        });
    }

    // Puedes agregar más métodos, por ejemplo, para crear una orden
    static async createOrder(data: { amount: number; status: string }) {
        return await prisma.order.create({
            data,
        });
    }
}