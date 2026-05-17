import { hash, compare } from "bcryptjs";
import type { User, UserCredentials } from "@/domain/entities/user";
import type {
  AuthRepository,
  CreateUserInput,
} from "@/domain/repositories/auth-repository";

type StoredUser = User & { passwordHash: string };

const users = new Map<string, StoredUser>();

export class InMemoryAuthRepository implements AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.toLowerCase();
    for (const user of users.values()) {
      if (user.email === normalized) {
        return this.toPublic(user);
      }
    }
    return null;
  }

  async create(input: CreateUserInput): Promise<User> {
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
