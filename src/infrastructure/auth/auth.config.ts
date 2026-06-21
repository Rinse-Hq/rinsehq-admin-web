import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInUseCase } from "@/infrastructure/di/container";
import { storeRepository } from "@/infrastructure/stores/in-memory-store-repository";

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        storeId: { label: "Store", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        const storeId = credentials?.storeId as string | undefined;
        if (!email || !password || !storeId) return null;

        const result = await signInUseCase.execute({ email, password });
        if (!result.success) return null;

        storeRepository.seedOwnerStores(result.data.id, result.data.email);
        const store = storeRepository.getStoreById(
          storeId,
          result.data.id,
          result.data.email,
        );
        if (!store) return null;

        return {
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          storeId: store.storeId,
          storeName: store.storeName,
          storeRole: store.role,
          permissionLevel: store.permissionLevel,
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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.storeId = user.storeId;
        token.storeName = user.storeName;
        token.storeRole = user.storeRole;
        token.permissionLevel = user.permissionLevel;
      }

      if (trigger === "update" && session?.user) {
        const update = session.user;

        if (update.storeId) token.storeId = update.storeId;
        if (update.storeName) token.storeName = update.storeName;
        if (update.storeRole) token.storeRole = update.storeRole;
        if (update.permissionLevel) {
          token.permissionLevel = update.permissionLevel;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.storeId = token.storeId as string;
        session.user.storeName = token.storeName as string;
        session.user.storeRole = token.storeRole as string;
        session.user.permissionLevel = token.permissionLevel as NonNullable<
          typeof token.permissionLevel
        >;
      }
      return session;
    },
  },
};
