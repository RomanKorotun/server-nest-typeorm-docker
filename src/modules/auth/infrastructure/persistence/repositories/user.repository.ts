import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserEntity } from '../../persistence/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { DomainUser } from '../../../domain/entities/user';
import { CreateUserProps } from '../../../../../modules/auth/domain/types/create-user.props';
import { UpdateUserRoleProps } from 'src/modules/admin/domain/types/update-user.props';
import { Role } from '../../../../../common/enums/role.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  private mapToDomain(user: UserEntity): DomainUser {
    return new DomainUser(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.role,
      user.createdAt,
      user.updatedAt,
    );
  }

  private mapToEntity(user: DomainUser): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.getId();
    userEntity.firstName = user.getFirstName();
    userEntity.lastName = user.getLastName();
    userEntity.email = user.getEmail();
    userEntity.password = user.getPassword();
    userEntity.role = user.getRole();
    userEntity.createdAt = user.getCreatedAt();
    userEntity.updatedAt = user.getUpdatedAt();
    return userEntity;
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return this.mapToDomain(user);
  }

  async findById(id: string): Promise<DomainUser | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return this.mapToDomain(user);
  }

  async createUser(props: CreateUserProps): Promise<DomainUser> {
    const user = this.userRepo.create(props);
    const saved = await this.userRepo.save(user);
    return this.mapToDomain(saved);
  }

  async updateRole(
    id: string,
    dto: UpdateUserRoleProps,
  ): Promise<DomainUser | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    const userEntity = this.mapToEntity(user);
    Object.assign(userEntity, dto);
    const saved = await this.userRepo.save(userEntity);
    return this.mapToDomain(saved);
  }

  async findAll(
    role: Role,
    page: number,
    limit: number,
  ): Promise<DomainUser[]> {
    const skip = (page - 1) * limit;

    if (role === Role.SUPER_ADMIN) {
      const users = await this.userRepo.find({
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      });
      return users.map((user) => this.mapToDomain(user));
    }

    if (role === Role.ADMIN) {
      const users = await this.userRepo.find({
        where: { role: Not(Role.SUPER_ADMIN) },
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      });
      return users.map((user) => this.mapToDomain(user));
    }

    if (role === Role.MODERATOR) {
      const users = await this.userRepo.find({
        where: { role: Role.USER },
        skip,
        take: limit,
        order: { createdAt: 'DESC' },
      });
      return users.map((user) => this.mapToDomain(user));
    }

    return [];
  }
}
