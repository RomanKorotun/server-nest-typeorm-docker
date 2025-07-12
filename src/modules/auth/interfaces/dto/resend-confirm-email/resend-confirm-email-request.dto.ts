import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendConfirmEmailRequestDto {
  @ApiProperty({
    description: 'Email користувача',
    example: 'roman@ukr.net',
  })
  @IsNotEmpty({ message: 'Поле email не може бути пустим' })
  @IsEmail({}, { message: 'Поле email містить не вірний формат' })
  email: string;
}
