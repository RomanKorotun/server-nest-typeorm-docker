import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupService } from './services/signup.service';
import { SignupRequestDto } from './dto/signup-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignupSwagger } from './swagger/signup-swagger';
import { SignupResponse } from './types/signup-type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly signupService: SignupService) {}

  @SignupSwagger()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignupRequestDto): Promise<SignupResponse> {
    return await this.signupService.execute(dto);
  }
}
