import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { nanoid } from 'nanoid';
import { UserRepository } from '../repositories/user.repository';
import { SignupRequestDto } from '../dto/signup-request.dto';
import { UserEmailVerificationRepository } from '../repositories/user-email-verificarion.repository';
import { EmailSenderService } from '../../../infrastructure/email/services/email-sender.service';
import { EmailContentService } from '../../../infrastructure/email/services/email-content.service';
import { SignupResponse } from '../types/signup-type';

@Injectable()
export class SignupService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userEmailVefificationRepository: UserEmailVerificationRepository,
    private readonly emailSenderService: EmailSenderService,
    private readonly emailContentService: EmailContentService,
  ) {}

  async execute(dto: SignupRequestDto): Promise<SignupResponse> {
    const { email, password, firstName } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new ConflictException(
        `Користувач з email ${email} уже існує в базі`,
      );
    }

    const hashPasssword = await argon2.hash(password);

    const newUser = await this.userRepository.createUser({
      ...dto,
      password: hashPasssword,
    });

    const verificationCode = nanoid();

    await this.userEmailVefificationRepository.createVerifacation(
      newUser,
      verificationCode,
    );

    const registerEmail = this.emailContentService.createConfirmEmail(
      'soxadi4082@binafex.com',
      firstName,
      verificationCode,
    );

    await this.emailSenderService.sendEmail(registerEmail);

    return {
      message:
        'Реєстрація пройшла успішно. Ми надіслали лист для підтвердження електронної пошти.',
    };
  }
}
