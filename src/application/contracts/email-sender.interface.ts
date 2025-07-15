import { ISendMailOptions } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';

export interface EmailOptions extends ISendMailOptions {
  template?: string;
  context?: any;
}

export interface IEmailSender {
  sendEmail(options: EmailOptions): Promise<SentMessageInfo>;
}
