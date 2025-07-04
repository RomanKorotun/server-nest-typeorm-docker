import { ApiProperty } from '@nestjs/swagger';

export class SignupSuccessResponseDto {
  @ApiProperty({
    description: 'Ідентифікатор користувача',
    example: '274483a0-75ad-46f0-b09a-7896fbfaa993',
  })
  id: string;

  @ApiProperty({
    description: 'Ім"я користувача',
    minLength: 2,
    maxLength: 50,
    example: 'Роман',
  })
  firstName: string;

  @ApiProperty({
    description: 'Прізвище користувача',
    minLength: 2,
    maxLength: 50,
    example: 'Коротун',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email користувача',
    example: 'romna@ukr.net',
  })
  email: string;

  @ApiProperty({
    description: 'Пароль користувача',
    example: 'R123456',
  })
  password: string;
}
