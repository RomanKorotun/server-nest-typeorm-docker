import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserRoleUnauthorizedResponseDto {
  @ApiProperty({ description: 'HTTP статус відповіді', example: 401 })
  status: number;

  @ApiProperty({
    description: 'Текст помилки',
    example: 'Unauthorized',
  })
  message: string;

  @ApiProperty({
    description: 'URL, на який був зроблений запит',
    example: '/api/admin/users/ca0f9c41-717c-498c-bfab-d15ad916489f/role',
  })
  url: string;

  @ApiProperty({
    description: 'Час виникнення помилки',
    example: '2025-07-04T13:06:18.729Z',
  })
  timestamp: string;
}
