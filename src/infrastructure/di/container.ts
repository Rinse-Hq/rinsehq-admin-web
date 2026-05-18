import { SignUpUseCase } from "@/application/use-cases/sign-up";
import { SignInUseCase } from "@/application/use-cases/sign-in";
import { VerifyEmailUseCase } from "@/application/use-cases/verify-email";
import { ResendVerificationUseCase } from "@/application/use-cases/resend-verification";
import { InMemoryAuthRepository } from "@/infrastructure/auth/in-memory-user-store";

const authRepository = new InMemoryAuthRepository();

export const signUpUseCase = new SignUpUseCase(authRepository);
export const signInUseCase = new SignInUseCase(authRepository);
export const verifyEmailUseCase = new VerifyEmailUseCase(authRepository);
export const resendVerificationUseCase = new ResendVerificationUseCase(
  authRepository,
);
