import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailVerificationEntity } from '../persistence/entities/user-email-verification.entity';
import { Repository } from 'typeorm';
import { IUserEmailVerificationRepository } from '../../domain/repositories/user-email.verification.repository';
import { DomainUserEmailVerification } from '../../domain/entities/user-email-verification';
import { DomainUser } from '../../domain/entities/user';
import { UserEntity } from '../persistence/entities/user.entity';

@Injectable()
export class UserEmailVerificationRepository
  implements IUserEmailVerificationRepository
{
  constructor(
    @InjectRepository(UserEmailVerificationEntity)
    private readonly userEmailVerifacationRepo: Repository<UserEmailVerificationEntity>,
  ) {}

  private mapToDomain(
    verification: UserEmailVerificationEntity,
  ): DomainUserEmailVerification {
    return new DomainUserEmailVerification(
      verification.id,
      verification.isEmailConfirmed,
      verification.verificationCode,
      verification.userId,
      verification.createdAt,
      verification.updatedAt,
    );
  }

  async createVerification(
    user: DomainUser,
    verificationCode: string,
  ): Promise<DomainUserEmailVerification> {
    const userEntity = new UserEntity();
    userEntity.id = user.getId();
    const verification = this.userEmailVerifacationRepo.create({
      verificationCode: verificationCode,
      user: userEntity,
    });
    const saved = await this.userEmailVerifacationRepo.save(verification);
    return this.mapToDomain(saved);
  }
}
