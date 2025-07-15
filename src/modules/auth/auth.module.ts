import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/entities/user.entity';
import { UserEmailVerificationEntity } from './infrastructure/persistence/entities/user-email-verification.entity';
import { SignupService } from './application/use-cases/signup/signup.service';
import { AuthController } from './interfaces/controllers/auth.controller';
import { CodeGeneratorModule } from '../../shared/code-generator/code-generator.module';
import { ConfirmEmailService } from './application/use-cases/confirm-email/confirm-email.service';
import { ResendConfirmEmailService } from './application/use-cases/resend-confirm-email/resend-confirm-email.service';
import { SigninService } from './application/use-cases/signin/signin.service';
import { PasswordHashService } from './infrastructure/services/password-hash.service';
import { UserRepository } from './infrastructure/persistence/repositories/user.repository';
import { UserEmailVerificationRepository } from './infrastructure/persistence/repositories/user-email-verificarion.repository';
import { TokenService } from './infrastructure/services/token.service';
import { CookieService } from './infrastructure/services/cookie.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserEmailVerificationEntity]),
    CodeGeneratorModule,
  ],
  controllers: [AuthController],
  providers: [
    SignupService,
    SigninService,
    { provide: 'IUserRepository', useClass: UserRepository },
    {
      provide: 'IUserEmailVerificationRepository',
      useClass: UserEmailVerificationRepository,
    },
    { provide: 'IPasswordHashService', useClass: PasswordHashService },
    { provide: 'ITokenService', useClass: TokenService },
    { provide: 'ICookieService', useClass: CookieService },
    ConfirmEmailService,
    ResendConfirmEmailService,
  ],
})
export class AuthModule {}
