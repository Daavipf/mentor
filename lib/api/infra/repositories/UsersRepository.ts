import { Prisma, PrismaClient } from "@/lib/prisma/prisma/client";
import { IUsersRepository } from "@/lib/api/domain/repositories/IUsersRepository";
import { User } from "@/lib/api/domain/types/entities/User";

export default class UsersRepository implements IUsersRepository {
  prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async createUser(name: string, email: string, hashPassword: string): Promise<User> {
    try {
      return this.prisma.users.create({
        data: { name, email, password: hashPassword },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.users.findFirst({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
