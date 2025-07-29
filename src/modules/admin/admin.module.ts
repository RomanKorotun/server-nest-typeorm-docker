import { Module } from '@nestjs/common';
import { AdminController } from './interfaces/controllers/admin.controller';
import { ChangeUserRoleService } from './application/use-cases/changeUserRole/changeUserRole.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [ChangeUserRoleService],
})
export class AdminModule {}
