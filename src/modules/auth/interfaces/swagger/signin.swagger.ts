import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SigninSuccessResponseDto } from '../dto/signin/signin-success-response.dto';
import { SigninBadRequestResponseDto } from '../dto/signin/signin-bad-request.response.dto';
import { SigninUnauthorizedResponseDto } from '../dto/signin/signin-unauthorized-response.dto';

export const SigninSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Авторизує користувача',
      description:
        'Перевіряє email та пароль, встановлює access/refresh токени в cookies та повертає дані користувача',
    }),
    ApiOkResponse({
      type: SigninSuccessResponseDto,
      description: 'Успішна аутентифікація',
    }),
    ApiBadRequestResponse({
      type: SigninBadRequestResponseDto,
      description: 'Некоректні вхідні дані. Помилка валідації полів',
    }),
    ApiUnauthorizedResponse({
      type: SigninUnauthorizedResponseDto,
      description: 'Невірні email або password',
    }),
  );
};
