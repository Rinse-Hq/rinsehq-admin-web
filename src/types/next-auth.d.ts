import type { DefaultSession } from "next-auth";
import type { AdminPermissionLevel } from "@/presentation/data/account-mock-data";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      storeId: string;
      storeName: string;
      storeRole: string;
      permissionLevel: AdminPermissionLevel;
    } & DefaultSession["user"];
  }

  interface User {
    storeId: string;
    storeName: string;
    storeRole: string;
    permissionLevel: AdminPermissionLevel;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    storeId?: string;
    storeName?: string;
    storeRole?: string;
    permissionLevel?: AdminPermissionLevel;
  }
}
