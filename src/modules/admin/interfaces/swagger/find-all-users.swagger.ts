import { applyDecorators } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindAllUsersSuccessResponseDto } from '../dto/findAllUsers/find-all-users-success-response.dto';
import { FindAllUsersForbiddenResponseDto } from '../dto/findAllUsers/find-all-users-forbidden-response.dto';
import { FindAllUsersUnauthorizedResponseDto } from '../dto/findAllUsers/find-all-users-unauthorized-response.dto';

export const FindAllUsersSwagger = () => {
  return applyDecorators(
    ApiCookieAuth('accessToken'),
    ApiOperation({
      summary: 'Отримати список користувачів',
      description:
        'Отримання списку користувачів з пагінацією залежно від ролі: SUPER_ADMIN бачить усіх користувачів, ADMIN бачить всіх, крім SUPER_ADMIN, MODERATOR  бачить лише користувачів з роллю USER',
    }),
    ApiQuery({ name: 'page', description: 'номер сторінки для пагінації' }),
    ApiQuery({
      name: 'limit',
      description: 'кількість користувачів на сторінці',
    }),
    ApiOkResponse({
      type: FindAllUsersSuccessResponseDto,
      isArray: true,
      description: 'Отримано список користувачів',
    }),
    ApiUnauthorizedResponse({
      type: FindAllUsersUnauthorizedResponseDto,
      description:
        'Користувач не аутентифікований (не передано або недійсний токен)',
    }),
    ApiForbiddenResponse({
      type: FindAllUsersForbiddenResponseDto,
      description: 'У користувача немає прав на здійснення цього запиту',
    }),
  );
};
