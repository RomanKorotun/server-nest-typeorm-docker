import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ChangeUserRoleService } from '../../application/use-cases/changeUserRole/changeUserRole.service';
import { ChangeUserRoleRequestDto } from '../dto/changeUserRole/change-user-role-request.dto';
import { Role } from '../../../../common/enums/role.enum';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { JwtAccessGuard } from '../../../../common/guards/jwt-access.guard';
import { RolesGuard } from '../../../../common/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { ChangeUserRoleSwagger } from '../swagger/change-user-role.swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly changeUserRoleService: ChangeUserRoleService) {}

  @ChangeUserRoleSwagger()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('user/:id/role')
  changeUserRole(
    @Param('id') id: string,
    @Body() dto: ChangeUserRoleRequestDto,
  ) {
    return this.changeUserRoleService.execute(id, dto);
  }
}
