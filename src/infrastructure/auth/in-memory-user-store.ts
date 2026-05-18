import { hash, compare } from "bcryptjs";
import type { User, UserCredentials } from "@/domain/entities/user";
import type {
  AuthRepository,
  CreateUserInput,
} from "@/domain/repositories/auth-repository";
import type { RepositoryResult } from "@/domain/repositories/auth-repository";

type StoredUser = User & { passwordHash: string };

type VerificationEntry = {
  code: string;
  expiresAt: Date;
};

const users = new Map<string, StoredUser>();
const verificationCodes = new Map<string, VerificationEntry>();

const OTP_EXPIRY_MS = 15 * 60 * 1000;

const DEMO_USER = {
  email: "demo@rinsehq.com",
  password: "Demo1234!",
  name: "Laundry Care",
};

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizeEmail(email: string): string {
  return email.toLowerCase();
}

export class InMemoryAuthRepository implements AuthRepository {
  private seeded = false;

  private async ensureDemoUser() {
    if (this.seeded) return;
    this.seeded = true;

    const existing = await this.findByEmail(DEMO_USER.email);
    if (!existing) {
      await this.create({
        email: DEMO_USER.email,
        password: DEMO_USER.password,
        name: DEMO_USER.name,
      });
      const stored = await this.getStoredByEmail(DEMO_USER.email);
      if (stored) {
        stored.emailVerified = true;
        users.set(stored.id, stored);
      }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.ensureDemoUser();
    const stored = await this.getStoredByEmail(email);
    return stored ? this.toPublic(stored) : null;
  }

  async create(input: CreateUserInput): Promise<User> {
    await this.ensureDemoUser();
    const email = normalizeEmail(input.email);
    const id = crypto.randomUUID();
    const passwordHash = await hash(input.password, 12);
    const user: StoredUser = {
      id,
      email,
      name: input.name ?? email.split("@")[0],
      emailVerified: true,
      createdAt: new Date(),
      passwordHash,
    };
    users.set(id, user);
    return this.toPublic(user);
  }

  async validateCredentials(
    credentials: UserCredentials,
  ): Promise<User | null> {
    await this.ensureDemoUser();
    const stored = await this.getStoredByEmail(credentials.email);
    if (!stored) return null;

    const valid = await compare(credentials.password, stored.passwordHash);
    return valid ? this.toPublic(stored) : null;
  }

  async createVerificationCode(email: string): Promise<void> {
    const normalized = normalizeEmail(email);
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

    verificationCodes.set(normalized, { code, expiresAt });

    console.log(
      `[rinsehq] Verification code for ${normalized}: ${code}`,
    );
  }

  async verifyEmailCode(
    email: string,
    code: string,
  ): Promise<RepositoryResult<User>> {
    const normalized = normalizeEmail(email);
    const stored = await this.getStoredByEmail(normalized);

    if (!stored) {
      return { success: false, error: "Account not found" };
    }

    if (stored.emailVerified) {
      return { success: true, data: this.toPublic(stored) };
    }

    const entry = verificationCodes.get(normalized);
    if (!entry) {
      return { success: false, error: "No verification code found. Please resend." };
    }

    if (entry.expiresAt < new Date()) {
      verificationCodes.delete(normalized);
      return { success: false, error: "Verification code has expired. Please resend." };
    }

    if (entry.code !== code.trim()) {
      return { success: false, error: "Invalid verification code" };
    }

    stored.emailVerified = true;
    users.set(stored.id, stored);
    verificationCodes.delete(normalized);

    return { success: true, data: this.toPublic(stored) };
  }

  async resendVerificationCode(email: string): Promise<RepositoryResult<void>> {
    const normalized = normalizeEmail(email);
    const stored = await this.getStoredByEmail(normalized);

    if (!stored) {
      return { success: false, error: "Account not found" };
    }

    if (stored.emailVerified) {
      return { success: false, error: "Email is already verified" };
    }

    await this.createVerificationCode(normalized);
    return { success: true, data: undefined };
  }

  private async getStoredByEmail(email: string): Promise<StoredUser | null> {
    await this.ensureDemoUser();
    const normalized = normalizeEmail(email);
    for (const user of users.values()) {
      if (user.email === normalized) {
        return user;
      }
    }
    return null;
  }

  private toPublic(user: StoredUser): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    };
  }
}
