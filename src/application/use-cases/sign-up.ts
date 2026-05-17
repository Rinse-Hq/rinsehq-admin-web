import type { AuthRepository } from "@/domain/repositories/auth-repository";
import {
  signUpSchema,
  type AuthResult,
  type SignUpInput,
} from "@/application/dtos/auth-dtos";
import type { User } from "@/domain/entities/user";

export class SignUpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: SignUpInput): Promise<AuthResult<User>> {
    const parsed = signUpSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message ?? "Invalid input",
      };
    }

    const { email, password } = parsed.data;
    const existing = await this.authRepository.findByEmail(email);
    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const user = await this.authRepository.create({ email, password });
    return { success: true, data: user };
  }
}
