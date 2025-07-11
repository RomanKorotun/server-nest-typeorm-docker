export class DomainUserEmailVerification {
  constructor(
    private readonly id: string,
    private isEmailConfirmed: boolean,
    private verificationCode: string | null,
    private readonly userId: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  markAsConfirmed() {
    this.verificationCode = null;
    this.isEmailConfirmed = true;
  }

  getId() {
    return this.id;
  }

  getIsEmailConfirmed() {
    return this.isEmailConfirmed;
  }

  getVerificationCode() {
    return this.verificationCode;
  }

  getUserId() {
    return this.userId;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }
}
