export interface EmailTemplateData {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

export interface IEmailContent {
  createConfirmEmail(
    to: string,
    firstName: string,
    verificationCode: string,
  ): EmailTemplateData;
}
