import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
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
  providers: [EmailSenderService, EmailContentService],
  exports: [EmailSenderService, EmailContentService],
})
export class EmailModule {}
