import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../../../../../modules/auth/domain/repositories/user.repository';
import { ResendConfirmEmailRequestDto } from '../../../../../modules/auth/interfaces/dto/resend-confirm-email/resend-confirm-email-request.dto';
import { IUserEmailVerificationRepository } from '../../../../../modules/auth/domain/repositories/user-email-verification.repository';
import { IEmailContent } from '../../../../../application/contracts/email-content.interface';
import { IEmailSender } from '../../../../../application/contracts/email-sender.interface';
import { ResendConfirmEmailSuccessResponseDto } from 'src/modules/auth/interfaces/dto/resend-confirm-email/resend-confirm-email-success-response.dto';
import { IResendConfirmEmail } from '../../contracts/resend-confirm-email-service.interface';

@Injectable()
export class ResendConfirmEmailService implements IResendConfirmEmail {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IUserEmailVerificationRepository')
    private readonly userEmailVerificationRepository: IUserEmailVerificationRepository,
    @Inject('IEmailContent')
    private readonly emailContentService: IEmailContent,
    @Inject('IEmailSender')
    private readonly emailSenderService: IEmailSender,
  ) {}

  async execute(
    dto: ResendConfirmEmailRequestDto,
  ): Promise<ResendConfirmEmailSuccessResponseDto> {
    const { email } = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }

    const userId = user.getId();

    const verification =
      await this.userEmailVerificationRepository.findByUserId(userId);

    if (!verification) {
      throw new BadRequestException(
        'Користувач не має активного запиту на підтвердження електронної адреси',
      );
    }

    const isEmailConfirmed = verification.getIsEmailConfirmed();
    const verificationCode = verification.getVerificationCode();

    if (isEmailConfirmed) {
      throw new BadRequestException(
        'Користувач уже підтвердив електронну адресу',
      );
    }

    if (verificationCode === null) {
      throw new BadRequestException(
        'Секретний код для підтвердження електронної адреси не знайдено',
      );
    }

    const firstName = user.getFirstName();

    const confirmationEmail = this.emailContentService.createConfirmEmail(
      email,
      firstName,
      verificationCode,
    );

    await this.emailSenderService.sendEmail(confirmationEmail);

    return {
      message: 'Лист для підтвердження електронної адреси надіслано повторно',
    };
  }
}
