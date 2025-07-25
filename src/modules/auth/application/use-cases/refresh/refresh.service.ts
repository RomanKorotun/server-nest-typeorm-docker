import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ITokenService } from '../../contracts/token-service.interface';
import { ICookieService } from '../../contracts/cookie-service.interface';
import { TokenType } from '../../../../../modules/auth/enums/token-type.enum';

@Injectable()
export class RefreshService {
  constructor(
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('ICookieService')
    private readonly cookieService: ICookieService,
  ) {}
  execute(res: Response, userId: string) {
    const accessToken = this.tokenService.generate(userId, TokenType.ACCESS);
    const refreshToken = this.tokenService.generate(userId, TokenType.REFRESH);

    this.cookieService.setAuthToken(res, accessToken, TokenType.ACCESS);
    this.cookieService.setAuthToken(res, refreshToken, TokenType.REFRESH);

    return { message: 'Access Token i Refresh Token встановлені в cookies' };
  }
}
