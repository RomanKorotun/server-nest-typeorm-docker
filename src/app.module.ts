import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './infrastructure/app-config/app-config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { EmailModule } from './infrastructure/email/email.module';
import { JwtConfigModule } from './infrastructure/jwt-config/jwt-config.module';
import { AuthenticationStrategiesModule } from './infrastructure/authentication-strategies/authentication-strategies.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    JwtConfigModule,
    AuthenticationStrategiesModule,
    EmailModule,
    AuthModule,
  ],
})
export class AppModule {}
