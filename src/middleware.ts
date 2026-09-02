import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: ["/((?!auth/login|auth/register|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
