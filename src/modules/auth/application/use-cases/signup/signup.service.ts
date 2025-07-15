import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SignupRequestDto } from '../../../interfaces/dto/signup/signup-request.dto';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { IUserEmailVerificationRepository } from '../../../domain/repositories/user-email-verification.repository';
import { SignupResponse } from './signup-response.interface';
import { ICodeGenerator } from '../../../../../application/contracts/code-generator.interface';
import { IEmailContent } from '../../../../../application/contracts/email-content.interface';
import { IEmailSender } from '../../../../../application/contracts/email-sender.interface';
import { IPasswordHashService } from '../../contracts/password-hash-service.interface';

@Injectable()
export class SignupService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserEmailVerificationRepository')
    private readonly userEmailVerificationRepository: IUserEmailVerificationRepository,
    @Inject('IPasswordHashService')
    private readonly passwordHashService: IPasswordHashService,
    @Inject('ICodeGenerator')
    private readonly codeGeneratorService: ICodeGenerator,
    @Inject('IEmailContent')
    private readonly emailContentService: IEmailContent,
    @Inject('IEmailSender')
    private readonly emailSenderService: IEmailSender,
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
