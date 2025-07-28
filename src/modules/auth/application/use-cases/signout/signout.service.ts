import { Inject, Injectable } from '@nestjs/common';
import { ICookieService } from '../../contracts/cookie-service.interface';
import { Response } from 'express';
import { TokenType } from '../../../../../modules/auth/enums/token-type.enum';
import { SignoutSuccessResponseDto } from 'src/modules/auth/interfaces/dto/signout/signout-success-response.dto';
import { ISignoutService } from '../../contracts/signout-service.interface';

@Injectable()
export class SignoutService implements ISignoutService {
  constructor(
    @Inject('ICookieService') private readonly cookieService: ICookieService,
  ) {}
  execute(res: Response): SignoutSuccessResponseDto {
    this.cookieService.clearAuthCookie(res, TokenType.ACCESS);
    this.cookieService.clearAuthCookie(res, TokenType.REFRESH);
    return {
      message: 'Ви успішно вийшли з системи',
    };
  }
}
