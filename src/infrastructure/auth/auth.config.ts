import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInUseCase } from "@/infrastructure/di/container";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const result = await signInUseCase.execute({ email, password });
        if (!result.success) return null;

        return {
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnboarding = nextUrl.pathname.startsWith("/onboarding");
      const isAuthPage =
        nextUrl.pathname === "/login" ||
        nextUrl.pathname === "/signup" ||
        nextUrl.pathname === "/activate-email" ||
        nextUrl.pathname === "/account-activated" ||
        isOnboarding;

      if (isDashboard) return isLoggedIn;
      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
