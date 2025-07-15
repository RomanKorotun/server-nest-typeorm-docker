export class DomainUser {
  constructor(
    private readonly id: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly password: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  getId(): string {
    return this.id;
  }

  getFirstName() {
    return this.firstName;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }
}
