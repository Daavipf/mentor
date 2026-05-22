export interface IAuthService {
  authenticateUser(email: string, password: string): Promise<string>;
  registerUser(name: string, email: string, password: string, confirmPassword: string): Promise<string>;
}
