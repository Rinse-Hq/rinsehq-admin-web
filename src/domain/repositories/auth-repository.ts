import type { User, UserCredentials } from "@/domain/entities/user";

export type CreateUserInput = UserCredentials & {
  name?: string;
};

export type RepositoryResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  create(input: CreateUserInput): Promise<User>;
  validateCredentials(credentials: UserCredentials): Promise<User | null>;
  createVerificationCode(email: string): Promise<void>;
  verifyEmailCode(
    email: string,
    code: string,
  ): Promise<RepositoryResult<User>>;
  resendVerificationCode(email: string): Promise<RepositoryResult<void>>;
}
