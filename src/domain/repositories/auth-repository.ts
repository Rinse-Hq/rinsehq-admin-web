import type { User, UserCredentials } from "@/domain/entities/user";

export type CreateUserInput = UserCredentials & {
  name?: string;
};

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
  validateCredentials(credentials: UserCredentials): Promise<User | null>;
}
