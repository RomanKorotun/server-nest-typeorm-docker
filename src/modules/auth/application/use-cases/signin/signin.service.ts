import { Response } from 'express';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../../../modules/auth/domain/repositories/user.repository';
import { SigninRequestDto } from '../../../../../modules/auth/interfaces/dto/signin/signin-request.dto';
import { IPasswordHashService } from '../../contracts/password-hash-service.interface';
import { ITokenService } from '../../contracts/token-service.interface';
import { TokenType } from '../../../../../modules/auth/enums/token-type.enum';
import { ICookieService } from '../../contracts/cookie-service.interface';
import { SigninSuccessResponseDto } from 'src/modules/auth/interfaces/dto/signin/signin-success-response.dto';

@Injectable()
export class SigninService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPasswordHashService')
    private readonly passwordHashService: IPasswordHashService,
    @Inject('ITokenService')
    private readonly tokenService: ITokenService,
    @Inject('ICookieService')
    private readonly cookieService: ICookieService,
  ) {}

  async execute(
    dto: SigninRequestDto,
    res: Response,
  ): Promise<SigninSuccessResponseDto> {
    const { email, password } = dto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Невірні email або password');
    }

    const passwordHash = user.getPassword();

    const isPasswordValid = await this.passwordHashService.verify(
      passwordHash,
      password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Невірні email або password');
    }

    const userId = user.getId();

    const accessToken = this.tokenService.generate(userId, TokenType.ACCESS);
    const refreshToken = this.tokenService.generate(userId, TokenType.REFRESH);

    this.cookieService.setAuthToken(res, accessToken, TokenType.ACCESS);
    this.cookieService.setAuthToken(res, refreshToken, TokenType.REFRESH);

    const id = user.getId();
    const firstName = user.getFirstName();
    const lastName = user.getLastName();

    return {
      user: { id, firstName, lastName, email },
      message:
        'Аутентифікаця успішна. Access Token i Refresh Token встановлені в cookies',
    };
  }
}
