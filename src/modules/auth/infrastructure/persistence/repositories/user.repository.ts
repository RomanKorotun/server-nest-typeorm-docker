import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../persistence/entities/user.entity';
import { IUserRepository } from '../../../domain/repositories/user.repository';
import { DomainUser } from '../../../domain/entities/user';
import { CreateUserProps } from 'src/modules/auth/domain/types/create-user.props';
import { UpdateUserRoleProps } from 'src/modules/admin/domain/types/update-user.props';

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
}
