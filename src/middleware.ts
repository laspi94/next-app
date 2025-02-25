import { kernel } from "./middleware/kernel";
import { authMiddleware } from "./middleware/auth";
import { redirectMiddleware } from "./middleware/redirect";
import { redirectIfAuthenticateMiddleware } from "./middleware/redirectIfAuthenticate";

export const middleware = kernel([
  authMiddleware,
  redirectIfAuthenticateMiddleware,
  redirectMiddleware,
]);

/** Excluye archivos estáticos y API */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|img|css|favicon.ico|sw.js).*)",
  ],
};
