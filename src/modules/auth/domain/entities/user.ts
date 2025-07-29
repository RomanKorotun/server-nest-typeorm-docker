import { Role } from 'src/common/enums/role.enum';

export class DomainUser {
  constructor(
    private readonly id: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly password: string,
    private readonly role: Role,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  getId(): string {
    return this.id;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole(): Role {
    return this.role;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  toCurrentUser() {
    return {
      id: this.getId(),
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      email: this.getEmail(),
      role: this.getRole(),
    };
  }
}
