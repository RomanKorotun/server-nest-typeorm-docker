import { ApiProperty } from '@nestjs/swagger';

export class ResendConfirmEmailNotFoundResponseDto {
  @ApiProperty({ description: 'HTTP статус відповіді', example: 404 })
  status: number;

  @ApiProperty({
    description: 'Текст помилки',
    example: 'Користувача не знайдено',
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
