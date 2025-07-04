import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupService } from './services/signup.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signupService: SignupService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: CreateUserRequestDto) {
    return await this.signupService.signup(dto);
  }
}
