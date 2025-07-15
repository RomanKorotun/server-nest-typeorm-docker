import { Global, Module } from '@nestjs/common';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { UserRepository } from '../../modules/auth/infrastructure/persistence/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/auth/infrastructure/persistence/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    JwtAccessStrategy,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [JwtAccessStrategy],
})
export class AuthenticationStrategiesModule {}
