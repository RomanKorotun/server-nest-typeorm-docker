import { Response } from 'express';
import { SignoutSuccessResponseDto } from '../../interfaces/dto/signout/signout-success-response.dto';

export interface ISignoutService {
  execute(res: Response): SignoutSuccessResponseDto;
}
