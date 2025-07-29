import { Module } from '@nestjs/common';
import { AdminController } from './interfaces/controllers/admin.controller';
import { ChangeUserRoleService } from './application/use-cases/changeUserRole/changeUserRole.service';
import { AuthModule } from '../auth/auth.module';
import { FindAllUsersService } from './application/use-cases/findAllUsers/find-all-users.service';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [ChangeUserRoleService, FindAllUsersService],
})
export class AdminModule {}
