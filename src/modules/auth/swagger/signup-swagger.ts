import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SignupSuccessResponseDto } from '../dto/signup-success-response.dto';
import { SignupConflictResponseDto } from '../dto/signup-conflict-response.dto';
import { SignupBadRequestResponseDto } from '../dto/signup-bad-request-response.dto';

export const SignupSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Реєструє користувача в базі даних',
      description: 'Повертає зареєстрованого користувача',
    }),
    ApiCreatedResponse({
      type: SignupSuccessResponseDto,
      description: 'Успішна реєстрація користувача',
    }),
    ApiConflictResponse({
      type: SignupConflictResponseDto,
      description: 'Користувач з таким email уже існує',
    }),
    ApiBadRequestResponse({
      type: SignupBadRequestResponseDto,
      description: 'Некоректні вхідні дані. Помилка валідації полів',
    }),
  );
};
