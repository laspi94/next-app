import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type Middleware = (
  req: NextRequest
) => NextResponse | Promise<NextResponse | undefined> | void;

export function kernel(middlewares: Middleware[]) {
  return async function (req: NextRequest) {
    for (const middleware of middlewares) {
      const res = await middleware(req);
      if (res) {
        /** Si algún middleware retorna una respuesta, se detiene la ejecución */
        return res;
      }
    }
    /** Si todos los middlewares pasan sin retornar, se continúa con la ejecución */
    return NextResponse.next();
  };
}
