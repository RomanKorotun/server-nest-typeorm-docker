import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserEmailVerificationRepository } from 'src/modules/auth/domain/repositories/user-email-verification.repository';
import { ConfirmEmailSuccessResponseDto } from 'src/modules/auth/interfaces/dto/confirm-email/confirm-email-success-response.dto';
import { IConfirmEmailSergice } from '../../contracts/confirm-email-service.interface';

@Injectable()
export class ConfirmEmailService implements IConfirmEmailSergice {
  constructor(
    @Inject('IUserEmailVerificationRepository')
    private readonly userEmailVerificationRepository: IUserEmailVerificationRepository,
  ) {}
  async execute(
    verificationCode: string,
  ): Promise<ConfirmEmailSuccessResponseDto> {
    const verification =
      await this.userEmailVerificationRepository.findByVerificationCode(
        verificationCode,
      );

    if (!verification) {
      throw new NotFoundException(
        'Підтвердження не вдалося. Недійсне або вже використане посилання.',
      );
    }

    verification.markAsConfirmed();

    await this.userEmailVerificationRepository.confirmEmailByVerificationCode(
      verification,
    );

    return { message: 'Електронна пошта успішно підтверджена' };
  }
}
