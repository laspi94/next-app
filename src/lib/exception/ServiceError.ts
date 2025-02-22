import { NextResponse } from "next/server";
import { INTERNAL_SERVER_ERROR } from "../utils";

export class ServiceError extends Error {
    public code: number;

    constructor(message: string, code: number) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;

        Error.captureStackTrace(this, this.constructor);
    }
}

export function ServiceErrorHandler(error: unknown) {
    if (error instanceof ServiceError) {
        return NextResponse.json({ message: error.message, code: error.code }, { status: 400 });
    } else {
        return NextResponse.json({ message: "Error desconocido" }, { status: INTERNAL_SERVER_ERROR });
    }
}
