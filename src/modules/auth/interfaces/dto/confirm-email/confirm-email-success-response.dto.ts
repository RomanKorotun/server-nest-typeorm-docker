import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailSuccessResponseDto {
  @ApiProperty({
    description: 'Повідомлення про успішне підтвердження електронної пошти',
    example: 'Електронна пошта успішно підтверджена',
  })
  message: string;
}
