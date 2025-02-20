import { hash } from "bcryptjs";
import { registerData } from "./types";
import { code, ServiceError } from "../exception";
import { User } from "@/lib/prisma/models";
import { z } from "zod";

const userRegisterSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function registerUser(data: registerData) {

    const parsedData = userRegisterSchema.safeParse(data);

    if (!parsedData.success) {
        throw new ServiceError(parsedData.error.errors[0].message, code.BAD_REQUEST);
    }

    const existingUser = await User.findByEmail(data.email);
    if (existingUser) {
        throw new ServiceError("El correo ya está registrado", code.BAD_REQUEST);
    }

    const hashedPassword = await hash(data.password, 10);

    data = {
        ...data,
        password: hashedPassword
    };

    const newUser = await User.create(data);

    return newUser;
}