import { Response } from 'express';
import { TokenType } from '../../enums/token-type.enum';

export interface ICookieService {
  setAuthToken(res: Response, token: string, tokenType: TokenType): void;
  clearAuthCookie(res: Response, tokenType: TokenType): void;
}
