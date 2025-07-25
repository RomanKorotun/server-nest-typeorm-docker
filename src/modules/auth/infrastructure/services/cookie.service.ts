import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICookieService } from '../../application/contracts/cookie-service.interface';
import { CookieOptions, Response } from 'express';
import { TokenType } from '../../enums/token-type.enum';

@Injectable()
export class CookieService implements ICookieService {
  constructor(private readonly configService: ConfigService) {}
  setAuthToken(res: Response, token: string, tokenType: TokenType): void {
    const isProd =
      this.configService.getOrThrow<string>('NODE_ENV') === 'production';

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

    const tokenOptions: CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
    };

    if (tokenType === TokenType.ACCESS) {
      res.cookie('accessToken', token, {
        ...tokenOptions,
        maxAge: accessTokenTime * 1000,
      });
    } else if (tokenType === TokenType.REFRESH) {
      res.cookie('refreshToken', token, {
        ...tokenOptions,
        maxAge: refreshTokenTime * 1000,
      });
    } else {
      throw new InternalServerErrorException('Недопустимий тип токена');
    }
  }

  clearAuthCookie(res: Response, tokenType: TokenType): void {
    const isProd =
      this.configService.getOrThrow<string>('NODE_ENV') === 'production';

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
    };

    if (tokenType === TokenType.ACCESS) {
      res.clearCookie('accessToken', cookieOptions);
    } else if (tokenType === TokenType.REFRESH) {
      res.clearCookie('refreshToken', cookieOptions);
    } else {
      throw new InternalServerErrorException('Недопустимий тип токена');
    }
  }
}
