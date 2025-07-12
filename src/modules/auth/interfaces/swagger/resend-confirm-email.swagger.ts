import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ResendConfirmEmailSuccessResponseDto } from '../dto/resend-confirm-email/resend-confirm-email-success-response.dto';
import { ResendConfirmEmailNotFoundResponseDto } from '../dto/resend-confirm-email/resend-confirm-email-not-found-response.dto';
import { ResendConfirmEmailBadRequestResponseDto } from '../dto/resend-confirm-email/resend-confirm-email-bad-request-response.dto';

export const ResendConfirmEmailSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Надсилає лист підтвердження електронної адреси повторно',
      description:
        'Використовується, якщо попередній лист підтвердження не було отримано. Надсилає користувачу повторне посилання для підтвердження електронної адреси на основі вже створеного запиту.',
    }),
    ApiOkResponse({
      type: ResendConfirmEmailSuccessResponseDto,
      description:
        'Успішна повторна відправка листа для підтвердження електронної адреси',
    }),
    ApiNotFoundResponse({
      type: ResendConfirmEmailNotFoundResponseDto,
      description: 'Користувача з вказаною електронною адресою не знайдено',
    }),
    ApiBadRequestResponse({
      type: ResendConfirmEmailBadRequestResponseDto,
      description: 'Користувач уже підтвердив електронну адресу',
    }),
  );
};
