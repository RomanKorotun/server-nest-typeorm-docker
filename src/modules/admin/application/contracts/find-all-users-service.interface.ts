import { DomainUser } from '../../../../modules/auth/domain/entities/user';

export interface IFindAllUsersService {
  execute(user: DomainUser, page: number, limit: number): Promise<DomainUser[]>;
}
