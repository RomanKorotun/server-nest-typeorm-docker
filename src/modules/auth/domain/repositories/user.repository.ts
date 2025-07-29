import { DomainUser } from '../entities/user';
import { CreateUserProps } from '../types/create-user.props';
import { UpdateUserRoleProps } from 'src/modules/admin/domain/types/update-user.props';

export interface IUserRepository {
  findByEmail(email: string): Promise<DomainUser | null>;
  findById(id: string): Promise<DomainUser | null>;
  createUser(props: CreateUserProps): Promise<DomainUser>;
  updateRole(
    id: string,
    props: UpdateUserRoleProps,
  ): Promise<DomainUser | null>;
}
