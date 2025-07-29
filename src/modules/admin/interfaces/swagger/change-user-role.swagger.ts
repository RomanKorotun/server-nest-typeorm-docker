import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ChangeUserRoleSuccessResponseDto } from '../dto/changeUserRole/change-user-role-success-response.dto';
import { ChangeUserRoleForbiddenResponseDto } from '../dto/changeUserRole/change-user-role-forbidden-response.dto';

export const ChangeUserRoleSwagger = () => {
  return applyDecorators(
    ApiCookieAuth('accessToken'),
    ApiOperation({
      summary: 'Зміна ролі користувача',
      description:
        'Ендпойнт для зміни ролі користувача. Доступний лише для користувачів з роллю SUPER_ADMIN.',
    }),
    ApiParam({ name: 'id', description: 'id користувача' }),
    ApiOkResponse({
      type: ChangeUserRoleSuccessResponseDto,
      description: 'Роль користувача успішно змінено.',
    }),
    ApiForbiddenResponse({
      type: ChangeUserRoleForbiddenResponseDto,
      description:
        'Недостатньо прав для зміни ролі (потрібна роль SUPER_ADMIN).',
    }),
  );
};
