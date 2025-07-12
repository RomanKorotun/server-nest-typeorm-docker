import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { ConfirmEmailSuccessResponseDto } from '../dto/confirm-email/confirm-email-success-response.dto';
import { ConfirmEmailNotFoundResponseDto } from '../dto/confirm-email/confirm-email-not-found-response.dto';

export const ConfirmEmailSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Підтверджує електронну адресу користувача',
      description:
        'Використовується для підтвердження електронної адреси користувача на основі одноразового коду з листа',
    }),
    ApiParam({
      name: 'verificationCode',
      description: 'Одноразовий код підтвердження',
    }),
    ApiOkResponse({
      type: ConfirmEmailSuccessResponseDto,
      description: 'Успішне підтвердження електронної адреси',
    }),
    ApiNotFoundResponse({
      type: ConfirmEmailNotFoundResponseDto,
      description: 'Помилка під час підтвердження електронної адреси',
    }),
  );
};
