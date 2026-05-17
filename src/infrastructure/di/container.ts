import { SignUpUseCase } from "@/application/use-cases/sign-up";
import { SignInUseCase } from "@/application/use-cases/sign-in";
import { InMemoryAuthRepository } from "@/infrastructure/auth/in-memory-user-store";

const authRepository = new InMemoryAuthRepository();

export const signUpUseCase = new SignUpUseCase(authRepository);
export const signInUseCase = new SignInUseCase(authRepository);
