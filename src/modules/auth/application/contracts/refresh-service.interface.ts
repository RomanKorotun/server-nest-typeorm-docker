import { Response } from 'express';
import { RefreshSuccessResponseDto } from '../../interfaces/dto/refresh/refresh-success-response.dto';

export interface IRefreshService {
  execute(res: Response, userId: string): RefreshSuccessResponseDto;
}
