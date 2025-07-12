import { ApiProperty } from '@nestjs/swagger';

export class ResendConfirmEmailSuccessResponseDto {
  @ApiProperty({
    description:
      'Повідомлення про успішну повторну відправку листа для підтвердження електронної адреси',
    example: 'Лист для підтвердження електронної адреси надіслано повторно',
  })
  message: string;
}
