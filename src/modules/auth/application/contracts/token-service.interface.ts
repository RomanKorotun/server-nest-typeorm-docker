import { TokenType } from '../../enums/token-type.enum';

export interface ITokenService {
  generate(userId: string, tokenType: TokenType): string;
}
