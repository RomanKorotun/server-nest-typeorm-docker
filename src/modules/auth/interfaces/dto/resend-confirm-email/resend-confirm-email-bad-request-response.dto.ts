import { ApiProperty } from '@nestjs/swagger';

export class ResendConfirmEmailBadRequestResponseDto {
  @ApiProperty({ description: 'HTTP статус відповіді', example: 400 })
  status: number;

  @ApiProperty({
    description: 'Текст помилки',
    example: 'Користувач уже підтвердив електронну адресу',
  })
  message: string;

  @ApiProperty({
    description: 'URL, на який був зроблений запит',
    example: '/api/auth/confirm-email/resend',
  })
  url: string;

  @ApiProperty({
    description: 'Час виникнення помилки',
    example: '2025-07-04T13:06:18.729Z',
  })
  timestamp: string;
}
