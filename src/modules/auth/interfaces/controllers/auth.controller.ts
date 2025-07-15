import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignupService } from '../../application/use-cases/signup/signup.service';
import { SignupSwagger } from '../swagger/signup.swagger';
import { SignupRequestDto } from '../dto/signup/signup-request.dto';
import { SignupResponse } from '../../application/use-cases/signup/signup-response.interface';
import { ConfirmEmailService } from '../../application/use-cases/confirm-email/confirm-email.service';
import { ConfirmEmailSwagger } from '../swagger/confirm-email.swagger';
import { ResendConfirmEmailRequestDto } from '../dto/resend-confirm-email/resend-confirm-email-request.dto';
import { ResendConfirmEmailService } from '../../application/use-cases/resend-confirm-email/resend-confirm-email.service';
import { ResendConfirmEmailSwagger } from '../swagger/resend-confirm-email.swagger';
import { SigninRequestDto } from '../dto/signin/signin-request.dto';
import { SigninService } from '../../application/use-cases/signin/signin.service';
import { Response } from 'express';
import { SigninSwagger } from '../swagger/signin.swagger';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { DomainUser } from '../../domain/entities/user';
import { JwtAccessGuard } from '../../../../common/guards/jwt-access.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly confirmEmailService: ConfirmEmailService,
    private readonly resendConfirmEmailService: ResendConfirmEmailService,
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

  @ResendConfirmEmailSwagger()
  @Post('confirm-email/resend')
  @HttpCode(HttpStatus.OK)
  async resendConfirmEmail(@Body() dto: ResendConfirmEmailRequestDto) {
    return await this.resendConfirmEmailService.execute(dto);
  }

  @SigninSwagger()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() dto: SigninRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.signinService.execute(dto, res);
  }

  @UseGuards(JwtAccessGuard)
  @Get('current')
  @HttpCode(HttpStatus.OK)
  current(@CurrentUser() user: DomainUser) {
    return user;
  }
}
