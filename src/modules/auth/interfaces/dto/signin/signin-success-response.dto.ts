import { ApiProperty } from '@nestjs/swagger';
import { UserInfoResponseDto } from './user-info-response.dto';

export class SigninSuccessResponseDto {
  @ApiProperty({ type: UserInfoResponseDto })
  user: UserInfoResponseDto;

  @ApiProperty({
    description: 'Статус аутентифікації користувача',
    example:
      'Аутентифікація успішна. Access Token i Refresh Token встановлені в cookies',
  })
  message: string;
}
