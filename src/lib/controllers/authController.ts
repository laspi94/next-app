import { compare, hash } from "bcryptjs";
import { loginData, registerData } from "../types";
import { ServiceError } from "../exception";
import { Session, User } from "@/lib/prisma/models";
import { z } from "zod";
import { sessions, users } from "@prisma/client";
import { SESSION_TIMEOUT } from "../enviroment";
import { BAD_REQUEST, UNAUTHORIZE } from "../utils";

/**
 * register
 * 
 * @param data:registerData
 * @returns newUser: @/lib/prisma/models/user
 */

const registerValidation = z.object({
    email: z.string().email("El correo electrónico no es válido"),
    name: z.string().min(5, "El nombre debe tener al menos 5 caracteres"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmedPassword: z.string()
}).refine((data) => data.password == data.confirmedPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmedPassword"]
});

export async function registerUser(data: registerData) {

    const parsedData = registerValidation.safeParse(data);

    if (!parsedData.success) {
        throw new ServiceError(JSON.stringify(parsedData.error.errors), BAD_REQUEST);
    }

    const existingUser = await User.findByEmail(data.email);

    if (existingUser) {
        throw new ServiceError("El correo ya está en uso", BAD_REQUEST);
    }

    const hashedPassword = await hash(data.password, 10);

    data = {
        ...data,
        password: hashedPassword
    };

    const newUser = await User.create(data);

    return newUser;
}

/**
 * Login
 * 
 * @param data:loginData
 * @param req : Request
 * @returns token: string
 */

const loginValidation = z.object({
    email: z.string().min(1, "El email es obligatorio"),
    password: z.string().min(1, "La contraseña es obligatoria"),
});

export async function login(data: loginData, req: Request) {

    const faileAuthMessage = "Las credenciales no coinciden";

    const parsedData = loginValidation.safeParse(data);

    if (!parsedData.success) {
        throw new ServiceError(parsedData.error.errors[0].message, BAD_REQUEST);
    }
    const existingUser: users | null = await User.findByEmail(data.email);

    if (!existingUser) {
        throw new ServiceError(faileAuthMessage, UNAUTHORIZE);
    }

    // if (!existingUser.email_verified_at) {
    //     throw new ServiceError('El email no fue verificado', UNAUTHORIZE);
    // }

    const auth = await compare(data.password, existingUser.password);

    if (!auth) {
        throw new ServiceError(faileAuthMessage, UNAUTHORIZE);
    }

    const { token } = await Session.create(existingUser, req);

    return token;
}


/**
 * Session
 * 
 * @param token:string
 * @param req : Request
 * @returns user: @/lib/prisma/models/user
 */

export async function session(token: string, req: Request) {

    const sessionExist: sessions | null = await Session.exist(token);

    if (!sessionExist) {
        throw new ServiceError("Token no válido", UNAUTHORIZE);
    }

    const now = Math.floor(Date.now() / 1000);
    const timeDifference = now - sessionExist.last_activity;

    if (timeDifference > SESSION_TIMEOUT) {
        throw new ServiceError("El token de autenticación ha expirado", UNAUTHORIZE);
    }

    await Session.updateLastActivity(sessionExist.id);

    const user: users = await User.findById(Number(sessionExist.id_user));

    return user;
}