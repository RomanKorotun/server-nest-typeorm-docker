import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @IsNotEmpty({ message: 'Поле firstName не може бути пустим' })
  @IsString({ message: 'Поле firstName не повинно бути рядком' })
  @MinLength(2, {
    message: 'Поле firstName повинно містити не менше 2 символів',
  })
  @MaxLength(50, {
    message: 'Поле lastName повинно містити не більше 50 символів',
  })
  firstName: string;

  @IsNotEmpty({ message: 'Поле lastName не може бути пустим' })
  @IsString({ message: 'Поле lastName не повинно бути рядком' })
  @MinLength(2, {
    message: 'Поле lastName повинно містити не менше 2 символів',
  })
  @MaxLength(50, {
    message: 'Поле lastName повинно містити не більше 50 символів',
  })
  lastName: string;

  @IsNotEmpty({ message: 'Поле email не може бути пустим' })
  @IsEmail({}, { message: 'Поле email містить не вірний формат' })
  email: string;

  @IsNotEmpty({ message: 'Поле password не може бути порожнім' })
  @Matches(/^(?=.*[A-Z])(?=.*\d).{6,}$/, {
    message:
      'Поле password повинно містити мінімум 6 символів, принаймні одну цифру та одну велику літеру',
  })
  password: string;
}
