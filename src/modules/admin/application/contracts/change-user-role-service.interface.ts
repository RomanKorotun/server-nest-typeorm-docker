import { ChangeUserRoleRequestDto } from '../../interfaces/dto/changeUserRole/change-user-role-request.dto';
import { ChangeUserRoleSuccessResponseDto } from '../../interfaces/dto/changeUserRole/change-user-role-success-response.dto';

export interface IChangeUserRoleService {
  execute(
    userId: string,
    dto: ChangeUserRoleRequestDto,
  ): Promise<ChangeUserRoleSuccessResponseDto>;
}
