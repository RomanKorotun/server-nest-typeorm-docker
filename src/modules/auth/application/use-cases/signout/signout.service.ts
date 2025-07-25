import { Inject, Injectable } from '@nestjs/common';
import { ICookieService } from '../../contracts/cookie-service.interface';
import { Response } from 'express';
import { TokenType } from '../../../../../modules/auth/enums/token-type.enum';

@Injectable()
export class SignoutService {
  constructor(
    @Inject('ICookieService') private readonly cookieService: ICookieService,
  ) {}
  execute(res: Response) {
    this.cookieService.clearAuthCookie(res, TokenType.ACCESS);
    this.cookieService.clearAuthCookie(res, TokenType.REFRESH);
    return {
      message: 'Ви успішно вийшли з системи',
    };
  }
}
