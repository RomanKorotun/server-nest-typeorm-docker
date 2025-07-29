import { DomainUser } from '../../modules/auth/domain/entities/user';

export interface RequestWithUser extends Request {
  user: DomainUser;
}
