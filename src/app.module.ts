import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './infrastructure/config/config.module';
import { DatabaseModule } from './infrastructure/typeorm/typeorm.module';
import { EmailModule } from './infrastructure/email/email.module';
import { JwtConfigModule } from './infrastructure/jwt/jwt.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    JwtConfigModule,
    EmailModule,
    AuthModule,
  ],
})
export class AppModule {}
