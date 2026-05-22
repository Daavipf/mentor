import { IUsersRepository } from "../users/interface";
import { IAuthService } from "./interface";
import { signJwt, verifyPassword, hashPassword } from "./util";

export default class AuthService implements IAuthService {
  usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async authenticateUser(email: string, password: string): Promise<string> {
    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) throw new Error("Login ou senha inválidos");

    if (!verifyPassword(password, user.password)) throw new Error("Login ou senha inválidos");

    const token = signJwt({ email: user.email, userId: user.id });

    return token;
  }

  async registerUser(name: string, email: string, password: string, confirmPassword: string): Promise<string> {
    if (password !== confirmPassword) throw new Error("As senhas não conferem");

    const user = await this.usersRepository.findUserByEmail(email);

    if (user) throw new Error("Este e-mail já está em uso");

    const hash = hashPassword(password);
    const createdUser = await this.usersRepository.createUser(name, email, hash);
    const token = signJwt({ email: createdUser.email, userId: createdUser.id });

    return token;
  }
}
