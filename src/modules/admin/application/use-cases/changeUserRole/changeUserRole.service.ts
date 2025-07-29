import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IChangeUserRoleService } from '../../contracts/change-user-role-service.interface';
import { ChangeUserRoleRequestDto } from '../../../../../modules/admin/interfaces/dto/changeUserRole/change-user-role-request.dto';
import { ChangeUserRoleSuccessResponseDto } from '../../../../../modules/admin/interfaces/dto/changeUserRole/change-user-role-success-response.dto';
import { IUserRepository } from 'src/modules/auth/domain/repositories/user.repository';

@Injectable()
export class ChangeUserRoleService implements IChangeUserRoleService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
    dto: ChangeUserRoleRequestDto,
  ): Promise<ChangeUserRoleSuccessResponseDto> {
    const updateRoleUser = await this.userRepository.updateRole(userId, dto);

    if (!updateRoleUser) {
      throw new NotFoundException('Користувач не знайдений');
    }

    const id = updateRoleUser.getId();
    const firstName = updateRoleUser.getFirstName();
    const lastName = updateRoleUser.getLastName();
    const email = updateRoleUser.getEmail();
    const role = updateRoleUser.getRole();

    return { id, firstName, lastName, email, role };
  }
}
