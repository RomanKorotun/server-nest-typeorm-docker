import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailVerificationEntity } from '../../persistence/entities/user-email-verification.entity';
import { Repository } from 'typeorm';
import { IUserEmailVerificationRepository } from '../../../domain/repositories/user-email-verification.repository';
import { DomainUserEmailVerification } from '../../../domain/entities/user-email-verification';
import { DomainUser } from '../../../domain/entities/user';
import { UserEntity } from '../../persistence/entities/user.entity';

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
      verificationCode,
      user: userEntity,
    });

    const saved = await this.userEmailVerifacationRepo.save(verification);

    return this.mapToDomain(saved);
  }

  async findByVerificationCode(
    verificationCode: string,
  ): Promise<DomainUserEmailVerification | null> {
    const verification = await this.userEmailVerifacationRepo.findOne({
      where: { verificationCode },
    });

    if (!verification) {
      return null;
    }

    return this.mapToDomain(verification);
  }

  async findByUserId(
    userId: string,
  ): Promise<DomainUserEmailVerification | null> {
    const verification = await this.userEmailVerifacationRepo.findOne({
      where: { userId },
    });

    if (!verification) {
      return null;
    }

    return this.mapToDomain(verification);
  }

  async confirmEmailByVerificationCode(
    verification: DomainUserEmailVerification,
  ): Promise<void> {
    const entity = this.userEmailVerifacationRepo.create({
      id: verification.getId(),
      isEmailConfirmed: verification.getIsEmailConfirmed(),
      verificationCode: verification.getVerificationCode(),
      userId: verification.getUserId(),
      createdAt: verification.getCreatedAt(),
      updatedAt: verification.getUpdatedAt(),
    });
    await this.userEmailVerifacationRepo.save(entity);
  }
}
