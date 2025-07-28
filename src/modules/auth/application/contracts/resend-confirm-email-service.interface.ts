import { ResendConfirmEmailRequestDto } from '../../interfaces/dto/resend-confirm-email/resend-confirm-email-request.dto';
import { ResendConfirmEmailSuccessResponseDto } from '../../interfaces/dto/resend-confirm-email/resend-confirm-email-success-response.dto';

export interface IResendConfirmEmail {
  execute(
    dto: ResendConfirmEmailRequestDto,
  ): Promise<ResendConfirmEmailSuccessResponseDto>;
}
