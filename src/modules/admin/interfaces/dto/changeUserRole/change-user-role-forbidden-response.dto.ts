import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserRoleForbiddenResponseDto {
  @ApiProperty({ description: 'HTTP статус відповіді', example: 403 })
  status: number;

  @ApiProperty({
    description: 'Текст помилки',
    example: 'Role може змінювати лише SUPER_ADMIN',
  })
  message: string;

  @ApiProperty({
    description: 'URL, на який був зроблений запит',
    example: '/api/admin/user/ca0f9c41-717c-498c-bfab-d15ad916489f/role',
  })
  url: string;

  @ApiProperty({
    description: 'Час виникнення помилки',
    example: '2025-07-04T13:06:18.729Z',
  })
  timestamp: string;
}
