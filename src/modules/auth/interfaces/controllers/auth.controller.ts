import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SignupService } from '../../application/use-cases/signup/signup.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupSwagger } from '../swagger/signup-swagger';
import { SignupRequestDto } from '../dto/signup/signup-request.dto';
import { SignupResponse } from '../../application/use-cases/signup/signup-response.type';
import { ConfirmEmailService } from '../../application/use-cases/confirm-email/confirm-email.service';
import { ConfirmEmailSwagger } from '../swagger/confirm-email-swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly confirmEmailService: ConfirmEmailService,
  ) {}

  @SignupSwagger()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupRequestDto): Promise<SignupResponse> {
    return await this.signupService.execute(dto);
  }

  @ConfirmEmailSwagger()
  @Get('confirm-email/:verificationCode')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Param('verificationCode') verificationCode: string) {
    return await this.confirmEmailService.execute(verificationCode);
  }
}
