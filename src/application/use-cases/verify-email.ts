import type { AuthRepository } from "@/domain/repositories/auth-repository";
import {
  verifyEmailSchema,
  type AuthResult,
  type VerifyEmailInput,
} from "@/application/dtos/auth-dtos";
import type { User } from "@/domain/entities/user";

export class VerifyEmailUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: VerifyEmailInput): Promise<AuthResult<User>> {
    const parsed = verifyEmailSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message ?? "Invalid input",
      };
    }

    return this.authRepository.verifyEmailCode(
      parsed.data.email,
      parsed.data.code,
    );
  }
}
