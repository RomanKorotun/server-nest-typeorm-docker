import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignupRequestDto } from '../../../interfaces/dto/signup/signup-request.dto';
import { EmailSenderService } from '../../../../../infrastructure/email/services/email-sender.service';
import { EmailContentService } from '../../../../../infrastructure/email/services/email-content.service';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { IUserEmailVerificationRepository } from '../../../domain/repositories/user-email-verification.repository';
import { SignupResponse } from './signup-response.type';
import { IPasswordHash } from '../../contracts/password-hasher.interface';
import { ICodeGenerator } from '../../../../../shared/code-generator/code-generator.interface';

@Injectable()
export class SignupService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserEmailVerificationRepository')
    private readonly userEmailVerificationRepository: IUserEmailVerificationRepository,
    @Inject('IPasswordHash')
    private readonly passwordHashService: IPasswordHash,
    @Inject('ICodeGenerator')
    private readonly codeGeneratorService: ICodeGenerator,
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

    const hashPassword = await this.passwordHashService.hash(password);

    const newUser = await this.userRepository.createUser({
      ...dto,
      password: hashPassword,
    });

    const verificationCode = this.codeGeneratorService.generate();

    await this.userEmailVerificationRepository.createVerification(
      newUser,
      verificationCode,
    );

    const confirmationEmail = this.emailContentService.createConfirmEmail(
      email,
      firstName,
      verificationCode,
    );

    await this.emailSenderService.sendEmail(confirmationEmail);

    return {
      message:
        'Реєстрація пройшла успішно. Ми надіслали лист для підтвердження електронної пошти.',
    };
  }
}
