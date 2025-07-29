import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IUserRepository } from '../../../modules/auth/domain/repositories/user.repository';
import { DomainUser } from '../../../modules/auth/domain/entities/user';
import { JwtPayload } from '../../../modules/auth/types/jwt-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const refreshToken: unknown = req?.cookies?.refreshToken;
          return typeof refreshToken === 'string' ? refreshToken : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<DomainUser> {
    const { id } = payload;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException('Користувач не знайдений');
    }

    return user;
  }
}
