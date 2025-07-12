import { DomainUser } from '../entities/user';
import { DomainUserEmailVerification } from '../entities/user-email-verification';

export interface IUserEmailVerificationRepository {
  createVerification(
    user: DomainUser,
    verificationCode: string,
  ): Promise<DomainUserEmailVerification>;
  findByVerificationCode(
    verificationCode: string,
  ): Promise<DomainUserEmailVerification | null>;
  findByUserId(userId: string): Promise<DomainUserEmailVerification | null>;
  confirmEmailByVerificationCode(
    verification: DomainUserEmailVerification,
  ): Promise<void>;
}
