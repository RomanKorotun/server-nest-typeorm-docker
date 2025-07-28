import { Response } from 'express';
import { SigninRequestDto } from '../../interfaces/dto/signin/signin-request.dto';
import { SigninSuccessResponseDto } from '../../interfaces/dto/signin/signin-success-response.dto';

export interface ISigninService {
  execute(
    dto: SigninRequestDto,
    res: Response,
  ): Promise<SigninSuccessResponseDto>;
}
