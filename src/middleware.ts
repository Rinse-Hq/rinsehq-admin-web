export { auth as middleware } from "@/infrastructure/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};
