import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { IUserRepository } from '../../../modules/auth/domain/repositories/user.repository';
import { DomainUser } from '../../../modules/auth/domain/entities/user';
import { JwtPayload } from '../../../modules/auth/types/jwt-payload.type';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          const accessToken: unknown = req?.cookies?.accessToken;
          return typeof accessToken === 'string' ? accessToken : null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
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
