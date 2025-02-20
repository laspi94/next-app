import { NextResponse } from "next/server";

export class code {

    static readonly LOGIN_TIMEOUT = 440;

    static readonly UNAUTHORIZE = 401;

    static readonly FORBIDDEN = 403;

    static readonly BAD_REQUEST = 400;

    static readonly NOT_FOUND = 404;

    static readonly UNPROCESSABLE = 422;

    static readonly OK = 200;

}

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
        return NextResponse.json({ message: "Error desconocido" }, { status: 500 });
    }
}
