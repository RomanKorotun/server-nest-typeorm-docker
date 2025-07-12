import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SignupSuccessResponseDto } from '../dto/signup/signup-success-response.dto';
import { SignupConflictResponseDto } from '../dto/signup/signup-conflict-response.dto';
import { SignupBadRequestResponseDto } from '../dto/signup/signup-bad-request-response.dto';

export const SignupSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Реєструє користувача в базі даних',
      description:
        'Створює нового користувача в базі даних та надсилає лист для підтвердження електронної пошти',
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
