import { Global, Module } from '@nestjs/common';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserRepository } from '../../modules/auth/infrastructure/persistence/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/auth/infrastructure/persistence/entities/user.entity';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthenticationStrategiesModule {}
