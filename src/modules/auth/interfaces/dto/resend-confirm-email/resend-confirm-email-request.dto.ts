import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendConfirmEmailRequestDto {
  @IsNotEmpty({ message: 'Поле email не може бути пустим' })
  @IsEmail({}, { message: 'Поле email містить не вірний формат' })
  email: string;
}
