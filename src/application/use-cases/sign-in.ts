import type { AuthRepository } from "@/domain/repositories/auth-repository";
import { type AuthResult, type SignInInput } from "@/application/dtos/auth-dtos";
import type { User } from "@/domain/entities/user";

export class SignInUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: SignInInput): Promise<AuthResult<User>> {
    const email = input.email?.trim() ?? "";
    const password = input.password ?? "";

    const user = await this.authRepository.validateCredentials({ email, password });
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    return { success: true, data: user };
  }
}
