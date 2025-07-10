import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignupService } from '../../application/use-cases/signup/signup.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupSwagger } from '../swagger/signup-swagger';
import { SignupRequestDto } from '../dto/signup-request.dto';
import { SignupResponse } from '../../application/use-cases/signup/types/signup-response.type';

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
