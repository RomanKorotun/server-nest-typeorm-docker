import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ChangeUserRoleSuccessResponseDto } from '../dto/changeUserRole/change-user-role-success-response.dto';
import { ChangeUserRoleForbiddenResponseDto } from '../dto/changeUserRole/change-user-role-forbidden-response.dto';
import { ChangeUserRoleUnauthorizedResponseDto } from '../dto/changeUserRole/change-user-role-unauthorized-response.dto';

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
    ApiUnauthorizedResponse({
      type: ChangeUserRoleUnauthorizedResponseDto,
      description:
        'Користувач не аутентифікований (не передано або недійсний токен)',
    }),
    ApiForbiddenResponse({
      type: ChangeUserRoleForbiddenResponseDto,
      description:
        'Недостатньо прав для зміни ролі (потрібна роль SUPER_ADMIN).',
    }),
  );
};
