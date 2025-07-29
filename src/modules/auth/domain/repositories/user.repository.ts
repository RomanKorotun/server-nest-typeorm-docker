import { DomainUser } from '../entities/user';
import { CreateUserProps } from '../types/create-user.props';
import { UpdateUserRoleProps } from '../../../../modules/admin/domain/types/update-user.props';
import { Role } from '../../../../common/enums/role.enum';

export interface IUserRepository {
  findByEmail(email: string): Promise<DomainUser | null>;
  findById(id: string): Promise<DomainUser | null>;
  createUser(props: CreateUserProps): Promise<DomainUser>;
  updateRole(
    id: string,
    props: UpdateUserRoleProps,
  ): Promise<DomainUser | null>;
  findAll(role: Role, page: number, limit: number): Promise<DomainUser[]>;
}
