import { ApiProperty } from '@nestjs/swagger';

export class SignupSuccessResponseDto {
  @ApiProperty({
    description:
      'Повідомлення про успішну реєстрацію та інструкція щодо підтвердження електронної пошти',
    example:
      'Реєстрація пройшла успішно. Ми надіслали лист для підтвердження електронної пошти',
  })
  message: string;
}
