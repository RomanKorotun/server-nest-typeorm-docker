import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailVerificationEntity } from '../entities/user-email-verification.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserEmailVerificationRepository {
  constructor(
    @InjectRepository(UserEmailVerificationEntity)
    private readonly userEmailVerifacationRepository: Repository<UserEmailVerificationEntity>,
  ) {}

  async createVerifacation(user: UserEntity, createVerification: string) {
    const verification = this.userEmailVerifacationRepository.create({
      emailVerificationCode: createVerification,
      user,
    });
    return await this.userEmailVerifacationRepository.save(verification);
  }
}
