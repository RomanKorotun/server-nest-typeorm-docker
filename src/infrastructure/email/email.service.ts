import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import mjml2html from 'mjml';
import { SentMessageInfo } from 'nodemailer';

interface EmailOptions extends ISendMailOptions {
  template?: string;
  context?: any;
}

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
    if (options.template) {
      const templatePath = path.join(
        __dirname,
        '../../infrastructure/email/templates',
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
