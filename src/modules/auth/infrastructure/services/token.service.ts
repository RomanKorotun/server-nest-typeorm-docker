import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../application/contracts/token-service.interface';
import { TokenType } from '../../enums/token-type.enum';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  generate(userId: string, tokenType: TokenType): string {
    const accessTokenSecret = this.configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    const refreshTokenSecret = this.configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
    const accessTokenTime = +this.configService.getOrThrow(
      'JWT_ACCESS_TOKEN_TIME',
    );
    const refreshTokenTime = +this.configService.getOrThrow(
      'JWT_REFRESH_TOKEN_TIME',
    );

    if (
      Number.isNaN(accessTokenTime) ||
      accessTokenTime <= 0 ||
      Number.isNaN(refreshTokenTime) ||
      refreshTokenTime <= 0
    ) {
      throw new InternalServerErrorException(
        'JWT_ACCESS_TOKEN_TIME and JWT_REFRESH_TOKEN_TIME must be numbers',
      );
    }

    const payload = { id: userId };

    if (tokenType === TokenType.ACCESS) {
      return this.jwtService.sign(payload, {
        secret: accessTokenSecret,
        expiresIn: accessTokenTime,
      });
    }

    if (tokenType === TokenType.REFRESH) {
      return this.jwtService.sign(payload, {
        secret: refreshTokenSecret,
        expiresIn: refreshTokenTime,
      });
    }

    throw new InternalServerErrorException('Недопустимий тип токена');
  }
}
