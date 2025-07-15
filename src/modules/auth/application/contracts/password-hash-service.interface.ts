export interface IPasswordHashService {
  hash(password: string): Promise<string>;
  verify(hashPassword: string, password: string): Promise<boolean>;
}
