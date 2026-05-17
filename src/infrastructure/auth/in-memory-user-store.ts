import { hash, compare } from "bcryptjs";
import type { User, UserCredentials } from "@/domain/entities/user";
import type {
  AuthRepository,
  CreateUserInput,
} from "@/domain/repositories/auth-repository";

type StoredUser = User & { passwordHash: string };

const users = new Map<string, StoredUser>();

const DEMO_USER = {
  email: "demo@rinsehq.com",
  password: "Demo1234!",
  name: "Laundry Care",
};

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
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.ensureDemoUser();
    const normalized = email.toLowerCase();
    for (const user of users.values()) {
      if (user.email === normalized) {
        return this.toPublic(user);
      }
    }
    return null;
  }

  async create(input: CreateUserInput): Promise<User> {
    await this.ensureDemoUser();
    const email = input.email.toLowerCase();
    const id = crypto.randomUUID();
    const passwordHash = await hash(input.password, 12);
    const user: StoredUser = {
      id,
      email,
      name: input.name ?? email.split("@")[0],
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
    const user = await this.findByEmail(credentials.email);
    if (!user) return null;

    const stored = users.get(user.id);
    if (!stored) return null;

    const valid = await compare(credentials.password, stored.passwordHash);
    return valid ? user : null;
  }

  private toPublic(user: StoredUser): User {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
