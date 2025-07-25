import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from '../app-config/app-config.module';
import { mailerConfig } from '../../configs/mailer.config';
import { EmailSenderService } from './services/email-sender.service';
import { EmailContentService } from './services/email-content.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [ConfigService],
      useFactory: mailerConfig,
    }),
  ],
  providers: [
    { provide: 'IEmailSender', useClass: EmailSenderService },
    { provide: 'IEmailContent', useClass: EmailContentService },
  ],
  exports: ['IEmailSender', 'IEmailContent'],
})
export class EmailModule {}
