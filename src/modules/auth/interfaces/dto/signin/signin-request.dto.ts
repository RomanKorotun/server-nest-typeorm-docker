import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { PASSWORD_REGEX } from '../../../../../common/constants/regex.constants';
import { ApiProperty } from '@nestjs/swagger';

export class SigninRequestDto {
  @ApiProperty({ description: 'Email користувача', example: 'roman@ukr.net' })
  @IsNotEmpty({ message: 'Поле email не може бути пустим' })
  @IsEmail({}, { message: 'Поле email містить не вірний формат' })
  email: string;

  @ApiProperty({ description: 'Пароль користувача', example: 'R123456' })
  @IsNotEmpty({ message: 'Поле password не може бути порожнім' })
  @Matches(PASSWORD_REGEX, {
    message:
      'Поле password повинно містити мінімум 6 символів, принаймні одну цифру та одну велику літеру',
  })
  password: string;
}
