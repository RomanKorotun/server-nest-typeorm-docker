import { SignupRequestDto } from '../../interfaces/dto/signup/signup-request.dto';
import { SignupSuccessResponseDto } from '../../interfaces/dto/signup/signup-success-response.dto';

export interface ISignupService {
  execute(dto: SignupRequestDto): Promise<SignupSuccessResponseDto>;
}
