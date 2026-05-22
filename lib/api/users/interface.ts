import { Prisma } from "@/lib/prisma/prisma/client";

export interface IUsersRepository {
  createUser(name: string, email: string, hashPassword: string): Promise<Prisma.UsersModel>;
  findUserById(id: string): Promise<Prisma.UsersModel | null>;
  findUserByEmail(email: string): Promise<Prisma.UsersModel | null>;
}
