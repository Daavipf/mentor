import { User } from "../types/entities/User";

export interface IUsersRepository {
  createUser(name: string, email: string, hashPassword: string): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}
