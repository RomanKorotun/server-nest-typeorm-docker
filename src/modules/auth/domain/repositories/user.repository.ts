import { DomainUser } from '../entities/user';
import { CreateUserInput } from '../types/create-user.input';

export interface IUserRepository {
  findByEmail(email: string): Promise<DomainUser | null>;
  createUser(input: CreateUserInput): Promise<DomainUser>;
}
