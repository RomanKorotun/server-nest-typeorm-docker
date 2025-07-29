import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
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
import { DomainUser } from '../../../../modules/auth/domain/entities/user';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { FindAllUsersService } from '../../application/use-cases/findAllUsers/find-all-users.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly changeUserRoleService: ChangeUserRoleService,
    private readonly findAllUsersService: FindAllUsersService,
  ) {}

  @ChangeUserRoleSwagger()
  @Roles(Role.SUPER_ADMIN)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('user/:id/role')
  async changeUserRole(
    @Param('id') id: string,
    @Body() dto: ChangeUserRoleRequestDto,
  ) {
    return await this.changeUserRoleService.execute(id, dto);
  }

  @Roles(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR)
  @UseGuards(JwtAccessGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Get('users')
  async findAllUsers(
    @CurrentUser() user: DomainUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return await this.findAllUsersService.execute(user, page, limit);
  }
}
