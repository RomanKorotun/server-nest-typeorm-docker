import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../persistence/entities/user.entity';
import { Repository } from 'typeorm';
import { SignupRequestDto } from '../../interfaces/dto/signup-request.dto';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { DomainUser } from '../../domain/entities/user';

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
      user.createdAt,
      user.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<DomainUser | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return this.mapToDomain(user);
  }

  async createUser(dto: SignupRequestDto): Promise<DomainUser> {
    const user = this.userRepo.create(dto);
    const saved = await this.userRepo.save(user);
    return this.mapToDomain(saved);
  }
}
