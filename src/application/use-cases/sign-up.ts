import type { AuthRepository } from "@/domain/repositories/auth-repository";
import { type AuthResult, type SignUpInput } from "@/application/dtos/auth-dtos";
import type { User } from "@/domain/entities/user";

export class SignUpUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: SignUpInput): Promise<AuthResult<User>> {
    const email = input.email.trim().toLowerCase();
    const password = input.password;

    const existing = await this.authRepository.findByEmail(email);
    if (existing) {
      return { success: true, data: existing };
    }

    const user = await this.authRepository.create({ email, password });
    return { success: true, data: user };
  }
}
