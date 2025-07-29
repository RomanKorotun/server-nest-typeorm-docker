import { ApiProperty } from '@nestjs/swagger';

export class FindAllUsersForbiddenResponseDto {
  @ApiProperty({ description: 'HTTP статус відповіді', example: 403 })
  status: number;

  @ApiProperty({
    description: 'Текст помилки',
    example: 'Role може змінювати лише SUPER_ADMIN',
  })
  message: string;

  @ApiProperty({
    description: 'URL, на який був зроблений запит',
    example: '/api/admin/users',
  })
  url: string;

  @ApiProperty({
    description: 'Час виникнення помилки',
    example: '2025-07-04T13:06:18.729Z',
  })
  timestamp: string;
}
