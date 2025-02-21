import { compare, hash } from "bcryptjs";
import { loginData, registerData } from "./types";
import { code, ServiceError } from "../exception";
import { Session, User } from "@/lib/prisma/models";
import { z } from "zod";
import { users } from "@prisma/client";

const registerValidation = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export async function registerUser(data: registerData) {

    const parsedData = registerValidation.safeParse(data);

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

const loginValidation = z.object({
    email: z.string().min(1, "El email es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria"),
});

export async function login(data: loginData, req: Request) {

    const faileAuthMessage = "Las credenciales no coinciden con nuestros registros";

    const parsedData = loginValidation.safeParse(data);

    if (!parsedData.success) {
        throw new ServiceError(parsedData.error.errors[0].message, code.BAD_REQUEST);
    }
    const existingUser: users | null = await User.findByEmail(data.email);

    if (!existingUser) {
        throw new ServiceError(faileAuthMessage, code.UNAUTHORIZE);
    }

    // if (!existingUser.email_verified_at) {
    //     throw new ServiceError('El email no fue verificado', code.UNAUTHORIZE);
    // }

    const auth = await compare(data.password, existingUser.password);

    if (!auth) {
        throw new ServiceError(faileAuthMessage, code.UNAUTHORIZE);
    }

    const { token } = await Session.create(existingUser, req);

    return token;
}