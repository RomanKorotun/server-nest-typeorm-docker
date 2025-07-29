import { Inject, Injectable } from '@nestjs/common';
import { IFindAllUsersService } from '../../contracts/find-all-users-service.interface';
import { DomainUser } from 'src/modules/auth/domain/entities/user';
import { IUserRepository } from 'src/modules/auth/domain/repositories/user.repository';
import { Role } from '../../../../../common/enums/role.enum';

@Injectable()
export class FindAllUsersService implements IFindAllUsersService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(
    user: DomainUser,
    page: number,
    limit: number,
  ): Promise<DomainUser[]> {
    const role: Role = user.getRole();
    return await this.userRepository.findAll(role, page, limit);
  }
}
