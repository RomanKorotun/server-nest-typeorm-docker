import { ApiProperty } from '@nestjs/swagger';

export class ConfirmEmailNotFoundResponseDto {
  @ApiProperty({ description: 'HTTP статус відповіді', example: 404 })
  status: number;

  @ApiProperty({
    description: 'Текст помилки',
    example: 'Підтвердження не вдалося. Недійсне або вже використане посилання',
  })
  message: string;

  @ApiProperty({
    description: 'URL, на який був зроблений запит',
    example: '/api/auth/confirm-email/Zm1Ryu_O1Yc6qIHQl57fj',
  })
  url: string;

  @ApiProperty({
    description: 'Час виникнення помилки',
    example: '2025-07-04T13:06:18.729Z',
  })
  timestamp: string;
}
