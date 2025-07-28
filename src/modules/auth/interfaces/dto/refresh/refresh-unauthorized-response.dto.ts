import { ApiProperty } from '@nestjs/swagger';

export class RefreshUnauthorizedResponseDto {
  @ApiProperty({
    description:
      'Повідомлення, що при перевірці refresh токена сталася помилка',
    example: 'Unauthorized',
  })
  message: string;
}
