import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import mjml2html from 'mjml';
import { SentMessageInfo } from 'nodemailer';
import {
  EmailOptions,
  IEmailSender,
} from '../../../application/contracts/email-sender.interface';

@Injectable()
export class EmailSenderService implements IEmailSender {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
    if (options.template) {
      const templatePath = path.join(
        __dirname,
        '../templates',
        `${options.template}.mjml`,
      );

      const mjmlTemplateContent = await fs.readFile(templatePath, 'utf8');

      const template = Handlebars.compile(mjmlTemplateContent);

      if (!options.context) {
        throw new InternalServerErrorException(
          'Відсутнє поле context в тілі листа',
        );
      }

      const mjmlWithContext = template(options.context);

      const { html, errors } = mjml2html(mjmlWithContext);

      if (errors.length) {
        throw new InternalServerErrorException(
          'Не вірний формат MJML файлу для електронного листа',
        );
      }

      options.html = html;

      delete options.template;
      delete options.context;
    }
    return await this.mailerService.sendMail(options);
  }
}
