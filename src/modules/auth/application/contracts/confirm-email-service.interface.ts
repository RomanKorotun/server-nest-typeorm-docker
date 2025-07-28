import { ConfirmEmailSuccessResponseDto } from '../../interfaces/dto/confirm-email/confirm-email-success-response.dto';

export interface IConfirmEmailSergice {
  execute(verificationCode: string): Promise<ConfirmEmailSuccessResponseDto>;
}
