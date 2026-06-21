import { hash, compare } from "bcryptjs";
import type { User, UserCredentials } from "@/domain/entities/user";
import type {
  AuthRepository,
  CreateUserInput,
} from "@/domain/repositories/auth-repository";
import type { RepositoryResult } from "@/domain/repositories/auth-repository";
import { demoAccounts } from "@/presentation/data/demo-accounts";
import { storeRepository } from "@/infrastructure/stores/in-memory-store-repository";

type StoredUser = User & { passwordHash: string };

type VerificationEntry = {
  code: string;
  expiresAt: Date;
};

const users = new Map<string, StoredUser>();
const verificationCodes = new Map<string, VerificationEntry>();

const OTP_EXPIRY_MS = 15 * 60 * 1000;

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function normalizeEmail(email: string): string {
  return email.toLowerCase();
}

export class InMemoryAuthRepository implements AuthRepository {
  private seeded = false;

  private async ensureDemoUsers() {
    if (this.seeded) return;
    this.seeded = true;

    for (const account of demoAccounts) {
      if (this.getStoredByEmailSync(account.email)) continue;

      if (account.role === "super_admin" || account.role === "owner") {
        await this.create({
          email: account.email,
          password: account.password,
          name: account.name,
        });
        const stored = this.getStoredByEmailSync(account.email);
        if (stored) {
          stored.emailVerified = true;
          users.set(stored.id, stored);
          storeRepository.seedOwnerStores(stored.id, account.email);
        }
        continue;
      }

      await this.createDemoMember(account.email, account.password, account.name);
    }

    const owner = this.getStoredByEmailSync("demo@rinsehq.com");
    if (owner) {
      storeRepository.seedOwnerStores(owner.id, owner.email);
    }
  }

  private async createDemoMember(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const normalized = normalizeEmail(email);
    const id = crypto.randomUUID();
    const passwordHash = await hash(password, 12);
    const user: StoredUser = {
      id,
      email: normalized,
      name,
      emailVerified: true,
      createdAt: new Date(),
      passwordHash,
    };
    users.set(id, user);
    return this.toPublic(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.ensureDemoUsers();
    const stored = await this.getStoredByEmail(email);
    return stored ? this.toPublic(stored) : null;
  }

  async create(input: CreateUserInput): Promise<User> {
    await this.ensureDemoUsers();
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
    storeRepository.createMainStore({
      ownerUserId: id,
      businessName: user.name,
    });
    return this.toPublic(user);
  }

  async validateCredentials(
    credentials: UserCredentials,
  ): Promise<User | null> {
    await this.ensureDemoUsers();
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

  private getStoredByEmailSync(email: string): StoredUser | null {
    const normalized = normalizeEmail(email);
    for (const user of users.values()) {
      if (user.email === normalized) {
        return user;
      }
    }
    return null;
  }

  private async getStoredByEmail(email: string): Promise<StoredUser | null> {
    await this.ensureDemoUsers();
    return this.getStoredByEmailSync(email);
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
