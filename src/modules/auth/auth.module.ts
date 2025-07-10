import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserEmailVerificationEntity } from './infrastructure/persistence/entities/user-email-verification.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserEmailVerificationRepository } from './infrastructure/repositories/user-email-verificarion.repository';
import { SignupService } from './application/use-cases/signup/signup.service';
import { AuthController } from './interfaces/controllers/auth.controller';
import { PasswordHashService } from './application/services/password-hasher.service';
import { CodeGeneratorModule } from '../../shared/code-generator/code-generator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserEmailVerificationEntity]),
    CodeGeneratorModule,
  ],
  controllers: [AuthController],
  providers: [
    SignupService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserEmailVerificationRepository',
      useClass: UserEmailVerificationRepository,
    },
    {
      provide: 'IPasswordHash',
      useClass: PasswordHashService,
    },
  ],
})
export class AuthModule {}
