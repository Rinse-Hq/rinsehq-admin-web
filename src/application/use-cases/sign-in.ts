import type { AuthRepository } from "@/domain/repositories/auth-repository";
import {
  signInSchema,
  type AuthResult,
  type SignInInput,
} from "@/application/dtos/auth-dtos";
import type { User } from "@/domain/entities/user";

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: SignInInput): Promise<AuthResult<User>> {
    const parsed = signInSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors[0]?.message ?? "Invalid input",
      };
    }

    const user = await this.authRepository.validateCredentials(parsed.data);
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    return { success: true, data: user };
  }
}
