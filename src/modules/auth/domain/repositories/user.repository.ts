import { DomainUser } from '../entities/user';
import { CreateUserProps } from '../types/create-user.props';

export interface IUserRepository {
  findByEmail(email: string): Promise<DomainUser | null>;
  createUser(props: CreateUserProps): Promise<DomainUser>;
}
