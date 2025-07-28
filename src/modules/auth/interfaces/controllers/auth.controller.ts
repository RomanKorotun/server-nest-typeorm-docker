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
import { CurrentSwagger } from '../swagger/current.swagger';
import { SignupSuccessResponseDto } from '../dto/signup/signup-success-response.dto';
import { SigninSuccessResponseDto } from '../dto/signin/signin-success-response.dto';
import { ConfirmEmailSuccessResponseDto } from '../dto/confirm-email/confirm-email-success-response.dto';
import { ResendConfirmEmailSuccessResponseDto } from '../dto/resend-confirm-email/resend-confirm-email-success-response.dto';
import { CurrentSuccessResponse } from '../dto/current/current-success_response.dto';
import { SignoutService } from '../../application/use-cases/signout/signout.service';
import { SignoutSwagger } from '../swagger/signout.swagger';
import { RefreshService } from '../../application/use-cases/refresh/refresh.service';
import { JwtRefreshGuard } from '../../../../common/guards/jwt-refresh.guard';
import { RefreshSwagger } from '../swagger/refresh.swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly signoutService: SignoutService,
    private readonly confirmEmailService: ConfirmEmailService,
    private readonly resendConfirmEmailService: ResendConfirmEmailService,
    private readonly refreshService: RefreshService,
  ) {}

  @SignupSwagger()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() dto: SignupRequestDto,
  ): Promise<SignupSuccessResponseDto> {
    return await this.signupService.execute(dto);
  }

  @ConfirmEmailSwagger()
  @Get('confirm-email/:verificationCode')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(
    @Param('verificationCode') verificationCode: string,
  ): Promise<ConfirmEmailSuccessResponseDto> {
    return await this.confirmEmailService.execute(verificationCode);
  }

  @ResendConfirmEmailSwagger()
  @Post('confirm-email/resend')
  @HttpCode(HttpStatus.OK)
  async resendConfirmEmail(
    @Body() dto: ResendConfirmEmailRequestDto,
  ): Promise<ResendConfirmEmailSuccessResponseDto> {
    return await this.resendConfirmEmailService.execute(dto);
  }

  @SigninSwagger()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() dto: SigninRequestDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SigninSuccessResponseDto> {
    return this.signinService.execute(dto, res);
  }

  @CurrentSwagger()
  @UseGuards(JwtAccessGuard)
  @Get('current')
  @HttpCode(HttpStatus.OK)
  current(@CurrentUser() user: DomainUser): CurrentSuccessResponse {
    return user.toCurrentUser();
  }

  @RefreshSwagger()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @CurrentUser() user: DomainUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = user.getId();
    return this.refreshService.execute(res, userId);
  }

  @SignoutSwagger()
  @UseGuards(JwtAccessGuard)
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  signout(@Res({ passthrough: true }) res: Response) {
    return this.signoutService.execute(res);
  }
}
