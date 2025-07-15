import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEmailContent } from '../../../application/contracts/email-content.interface';

@Injectable()
export class EmailContentService implements IEmailContent {
  constructor(private readonly configService: ConfigService) {}

  createConfirmEmail(to: string, firstName: string, verificationCode: string) {
    const BACKEND_URL = this.configService.getOrThrow<string>('BACKEND_URL');

    return {
      to,
      subject: 'Підтвердження електронної пошти',
      template: 'confirm-email',
      context: {
        name: firstName,
        confirmationLink: `${BACKEND_URL}/api/auth/confirm-email/${verificationCode}`,
      },
    };
  }
}
