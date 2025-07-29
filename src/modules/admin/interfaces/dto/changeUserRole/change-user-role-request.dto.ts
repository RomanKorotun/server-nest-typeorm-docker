import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../../../../common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUserRoleRequestDto {
  @ApiProperty({ description: 'Role користувача', example: 'moderator' })
  @IsNotEmpty({ message: 'Поле role не може бути пустим' })
  @IsEnum(Role)
  role: Role;
}
