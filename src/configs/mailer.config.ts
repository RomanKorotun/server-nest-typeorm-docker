import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const mailerConfig = (configService: ConfigService): MailerOptions => {
  return {
    transport: {
      host: configService.getOrThrow<string>('EMAIL_HOST'),
      port: +configService.getOrThrow<string>('EMAIL_PORT'),
      secure: true,
      auth: {
        user: configService.getOrThrow<string>('EMAIL_USER'),
        pass: configService.getOrThrow<string>('EMAIL_PASSWORD'),
      },
    },
    defaults: {
      from: configService.getOrThrow<string>('EMAIL_FROM'),
    },
  };
};
