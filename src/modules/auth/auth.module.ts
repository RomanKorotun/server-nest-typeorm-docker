import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignupService } from './services/signup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserEmailVerificationEntity } from './entities/user-email-verification.entity';
import { UserRepository } from './repositories/user.repository';
import { UserEmailVerificationRepository } from './repositories/user-email-verificarion.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserEmailVerificationEntity]),
  ],
  controllers: [AuthController],
  providers: [SignupService, UserRepository, UserEmailVerificationRepository],
})
export class AuthModule {}
