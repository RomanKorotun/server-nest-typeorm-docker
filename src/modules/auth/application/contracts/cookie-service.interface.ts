import { Response } from 'express';
import { TokenType } from '../../enums/token-type.enum';

export interface ICookieService {
  setAuthToken(res: Response, token: string, tokenType: TokenType): void;
}
