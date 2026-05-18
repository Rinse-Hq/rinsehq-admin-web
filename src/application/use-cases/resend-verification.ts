import type { AuthRepository } from "@/domain/repositories/auth-repository";
import {
  resendVerificationSchema,
  type AuthResult,
  type ResendVerificationInput,
} from "@/application/dtos/auth-dtos";

export class ResendVerificationUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: ResendVerificationInput): Promise<AuthResult<void>> {
    const parsed = resendVerificationSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message ?? "Invalid input",
      };
    }

    return this.authRepository.resendVerificationCode(parsed.data.email);
  }
}
