export function formatBigIntToString(value: bigint) {
    return typeof value === 'bigint' ? value.toString() : value
}

export const LOGIN_TIMEOUT = 440;

export const UNAUTHORIZE = 401;

export const FORBIDDEN = 403;

export const BAD_REQUEST = 400;

export const NOT_FOUND = 404;

export const METHOD_NOT_ALLOWED = 405;

export const UNPROCESSABLE = 422;

export const INTERNAL_SERVER_ERROR = 500;

export const OK = 200;

export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};