export { default } from "next-auth/middleware";

export const config = {
  // Proteger la raíz (dashboard) y otras rutas futuras
  matcher: ["/((?!auth/login|auth/register|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
