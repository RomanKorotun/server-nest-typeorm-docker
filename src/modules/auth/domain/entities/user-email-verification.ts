export class DomainUserEmailVerification {
  constructor(
    private readonly id: string,
    private readonly isEmailConfirmed: boolean,
    private readonly verificationCode: string | null,
    private readonly userId: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}
}
