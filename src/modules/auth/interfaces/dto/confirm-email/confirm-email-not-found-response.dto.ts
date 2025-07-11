import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailNotFoundResponseDto {
  @ApiProperty({
    description:
      'Повідомлення про помилку під час підтвердження електронної адреси',
    example: 'Підтвердження не вдалося. Недійсне або вже використане посилання',
  })
  message: string;
}
